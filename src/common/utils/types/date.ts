import * as t from 'io-ts'

export const Timecode = t.brand(
  t.string,
  (input): input is t.Branded<string, { readonly Timecode: unique symbol }> =>
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(input),
  'Timecode'
)
