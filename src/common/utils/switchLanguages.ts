import { ReactNode } from 'react'

const defaultLanguage = 'en'
const supportedLanguages = [defaultLanguage, 'ja'] as const

const languages = navigator.languages
let currentLanguage: (typeof supportedLanguages)[number] = defaultLanguage
for (const language of languages) {
  const languageCode = language.split('-')[0]
  if (supportedLanguages.includes(languageCode as any)) {
    currentLanguage = languageCode as (typeof supportedLanguages)[number]
    break
  }
}

document.documentElement.lang = currentLanguage

export const ml = (multiLanguageNode: {
  [key in (typeof supportedLanguages)[number]]: ReactNode
}) => {
  return multiLanguageNode[currentLanguage]
}

export const mlString = (multiLanguageString: {
  [key in (typeof supportedLanguages)[number]]: string
}) => {
  return multiLanguageString[currentLanguage]
}
