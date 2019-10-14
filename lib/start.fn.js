const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const { yellow, green } = require('chalk')
const inquirer = require('inquirer')
const inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt')
const fuzzy = require('fuzzy')
const { kv, merge } = require('@blast-engine/utils') 

const SCRIPTS_CONFIG_KEY = 'scripts-interactive-config'
const DEFAULT_SCRIPT_CONFIG = {
  showInSelect: true,
  description: '(no description)'
}

inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt)

const startInteractiveScripts = async packageRoot => {

  const packagePath = path.resolve(packageRoot, 'package.json')
  if (!fs.existsSync(packagePath)) 
    throw new Error(`package.json not found in ${packageRoot}`)

  let package
  try { package = require(packagePath) } 
  catch (e) { throw new Error(`package.json is broken`) }

  const scriptCommands = kv(package['scripts'])
    .map(({ k, v }) => ({ name: k, command: v }))
  
  const scriptsConfig = kv(package[ SCRIPTS_CONFIG_KEY])
    .map(({ k, v }) => ({ name: k, config: v }))

  const scripts = scriptCommands.map(sCmd => {
    
    const config = merge(
      DEFAULT_SCRIPT_CONFIG,
      (scriptsConfig.find(sCnf => sCnf.name === sCmd.name) || { config: {} }).config
    ) 

    return { ...sCmd, ...config }

  })
  .filter(script => script.showInSelect)
  .map(script => ({ 
    ...script, 
    chalkPrint: yellow(script.name) + ' -> ' + green(script.description) 
  }))

  const searchScripts = async (answers, input = '') =>
    fuzzy.filter(input, scripts.map(script => script.chalkPrint)).map(el => el.original)

  const { selectionChalk } = await inquirer.prompt([{
    type: 'autocomplete',
    name: 'selectionChalk',
    message: 'select script',
    source: searchScripts,
  }])
  
  const selection = scripts.find(s => s.chalkPrint === selectionChalk)

  return execSync(selection.command, { stdio: 'inherit' })

}

module.exports = { startInteractiveScripts }
