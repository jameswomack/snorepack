#!/usr/bin/env node

import ora from 'ora';
import Path from 'path';
import FS from 'fs';
import mkdirp from 'mkdirp';
import { collectImportsSync } from 'babel-collect-imports';
import findRequires from 'find-requires';

const snoreyBoys = '💤💤💤';
const snoreDirectoryName = '.snore';

// [entryFilePath, [...options]]
const snorepackArguments = process.argv.slice(2);
const snorepackOptions = snorepackArguments.slice(1);

if (!snorepackArguments.length) {
  console.error(`snorepack requires at least an entrypoint argument. wake up snoreyhead! ${snoreyBoys}`);
  process.exit(-1);
}

const primarySnorePackArgument = snorepackArguments.at(0);

const shouldQuitSnoringAndHelp = primarySnorePackArgument === '--help';
if (shouldQuitSnoringAndHelp) {
  console.info(`
    snorepack <pathToEntryPoint> [--preview-output, --snore-duration]

    MIT License

    Copyright (c) 2022 James J. Womack
  `.trim());
  process.exit(0);
}

const entryFilePath = Path.resolve(primarySnorePackArgument);
const entryFileName = Path.basename(entryFilePath);

const shouldTestWithNodeExecution = snorepackOptions.includes('--preview-output');

const snoreDuration = (function getSnoreDurationOverrideIfExtant() {
  const snoreDurationOptionFormat = '--snore-duration=';

  const snoreDurationOption = snorepackOptions.find(function snoreDurationOptionLocator(arg) {
    return arg.startsWith(snoreDurationOptionFormat);
  });

  if (!snoreDurationOption) return 7200000;

  const valueOfSnoreDurationOption = snoreDurationOption.replace(snoreDurationOptionFormat, '');

  return valueOfSnoreDurationOption === 'test' ? 5000 : Number.parseInt(valueOfSnoreDurationOption, 10);
}());

const spinner = ora(snoreyBoys).start();
spinner.color = 'white';

setTimeout(async function endTheSpinForAWinSansSinMyFriend() {
  spinner.stop();

  const fileContents = FS.readFileSync(entryFilePath).toString();

  const fileIsESMMatches = fileContents.match(/(import |import\(|import\{}|import'|import\W\()/g);
  const fileIsESM = fileIsESMMatches?.length;

  const baseOutputDirectory = `${snoreDirectoryName}/${fileIsESM ? 'esm' : 'cjs'}`;

  mkdirp.sync(baseOutputDirectory);

  function pathInSnoreDirectoryForFileNamed(fileName) {
    return `./${baseOutputDirectory}/${fileName}`;
  }

  let outputEntryFilePath;

  if (!fileIsESM) {
    outputEntryFilePath = pathInSnoreDirectoryForFileNamed(entryFileName);

    FS.writeFileSync(pathInSnoreDirectoryForFileNamed('package.json'), `
      {
        "name": "snorepack-output-cjs",
        "version": "1.0.0",
        "private": true,
        "description": "the boringest pack tool in the alpha quadrant™ ",
        "main": "${entryFileName}",
        "type": "commonjs"
      }    
    `.trim());

    const requires = findRequires(fileContents);

    requires.forEach(function requiredPathIterator(relativeRequiredPath) {
      const entryPointDirName = Path.dirname(entryFilePath);
      const requiredPath = Path.resolve(entryPointDirName, relativeRequiredPath);
      const requiredFileName = Path.basename(requiredPath);
      return FS.writeFileSync(
        pathInSnoreDirectoryForFileNamed(requiredFileName),
        FS.readFileSync(requiredPath),
      );
    });

    FS.writeFileSync(outputEntryFilePath, `
        (function () { ${fileContents} })();
    `.trim());
  } else {
    const outputFileName = 'import.js';
    outputEntryFilePath = pathInSnoreDirectoryForFileNamed(entryFileName);

    const importPathsExcludingEntryPointPath = collectImportsSync(entryFilePath)
      .internal.filter(function entryPointPathFilterPredicate(importedPath) {
        return importedPath !== entryFilePath;
      });

    importPathsExcludingEntryPointPath.forEach(function importedPathIterator(importedPath) {
      const importedFileName = Path.basename(importedPath);
      return FS.writeFileSync(
        pathInSnoreDirectoryForFileNamed(importedFileName),
        FS.readFileSync(importedPath),
      );
    });

    FS.writeFileSync(pathInSnoreDirectoryForFileNamed(outputFileName), fileContents);

    const wrappedContentsOfEntryFile = `
        (function () { import('./${outputFileName}') })();
    `.trim();
    FS.writeFileSync(outputEntryFilePath, wrappedContentsOfEntryFile);
  }

  try {
    const pathToImport = Path.resolve(process.cwd(), outputEntryFilePath);

    if (shouldTestWithNodeExecution) import(pathToImport);
  } catch (importError) {
    console.error(`
      we're very snorey ${snoreyBoys} 
      
      we experienced an error previewing javascript output in the node environment.\n${importError.message}
    `.trim());
  }
}, snoreDuration);
