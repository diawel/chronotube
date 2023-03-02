import { useCallback } from 'react'
import Dialog from '../Dialog'
import Drop from '../Drop'
import filterFile from './filterFile'
import { FileUploaderPropsType } from '..'

export type FilesType = {
  fileList: FileList
}

enum uploaderStyle {
  DIALOG = 'dialog',
  DROP = 'drop',
}

export type FileListSetterType = (fileList: FileList) => void
type FilterPropsType = FileUploaderPropsType & {
  type: keyof typeof uploaderStyle
}

const Filter: React.FC<FilterPropsType> = (props) => {
  const { type, fileSetter, acceptTypeList, multiple, children } = props

  const acceptList = acceptTypeList?.map((accept) => accept)

  const fileListSetter = useCallback(
    (fileList: FileList) => {
      fileSetter(filterFile(fileList, acceptList, multiple))
    },
    [fileSetter, acceptList, multiple]
  )

  switch (type) {
    case 'DIALOG':
      return (
        <Dialog
          fileListSetter={fileListSetter}
          acceptList={acceptList}
          multiple={multiple}
        >
          {children}
        </Dialog>
      )
    case 'DROP':
      return <Drop fileListSetter={fileListSetter}>{children}</Drop>
  }
}

export default Filter
