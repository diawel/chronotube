import Filter, { FilesType } from './Filter'

export type FileSetterType = (files: FilesType) => void
export type FileUploaderPropsType = {
  fileSetter: FileSetterType
  acceptTypeList?: string[]
  multiple?: boolean
  children?: React.ReactNode
}

const FileUploader = {
  Dialog: (props: FileUploaderPropsType) => {
    return <Filter {...props} type="DIALOG" />
  },
  Drop: (props: FileUploaderPropsType) => {
    return <Filter {...props} type="DROP" />
  },
}

export default FileUploader
