import { FilesType } from '.'

const filterFile = (
  inputFiles: FileList,
  acceptList?: string[],
  multiple?: boolean
): FilesType => {
  const filtered = new DataTransfer()

  // ファイルフォーマットのチェック用関数
  const checkFileformat = (file: File, accept: string): boolean => {
    if (accept.startsWith('.')) {
      return file.name.toLowerCase().endsWith(accept.toLowerCase())
    } else {
      return new RegExp(
        '^' +
          accept
            .replace(/([.+?^=!:${}()|[\]/\\])/g, '\\$1')
            .replace('*', '.*') +
          '$',
        'i'
      ).test(file.type)
    }
  }

  for (let fileI = 0; fileI < inputFiles.length; fileI++) {
    let deny = false

    // ファイルフォーマットのチェック
    if (
      acceptList?.length &&
      !acceptList.find((accept) => checkFileformat(inputFiles[fileI], accept))
    )
      deny = true

    // ファイル個数制限のチェック
    if (!multiple && filtered.files.length) deny = true

    if (deny) continue

    filtered.items.add(inputFiles[fileI])
  }

  const files: FilesType = { fileList: filtered.files }

  return files
}

export default filterFile
