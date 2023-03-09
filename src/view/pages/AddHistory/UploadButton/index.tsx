import {
  storeWatchHistories,
  validateHistoryies,
} from 'src/common/utils/db/watchHistory'
import FileUploader, {
  FileUploaderPropsType,
} from 'src/view/components/atoms/FileUploader'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import { ProgressType } from '..'

export type UploadButtonPropsType = {
  progressSetter: (progress: ProgressType) => void
}

const UploadButton: React.FC<UploadButtonPropsType> = (props) => {
  const { progressSetter } = props

  const uploadConfig: FileUploaderPropsType = {
    fileSetter: async (files) => {
      if (!files.fileList[0]) return
      progressSetter('init')
      let jsonText = '[]'
      switch ((files.fileList[0].name.match(/\.\w+$/) || [])[0]) {
        case '.json':
          jsonText = await files.fileList[0].text()
          break
        case '.zip':
          try {
            /* @ts-ignore */
            const unzip = new Zlib.Unzip(
              new Uint8Array(await files.fileList[0].arrayBuffer())
            )
            jsonText = new TextDecoder().decode(
              unzip.decompress(
                unzip
                  .getFilenames()
                  .filter((filename: string) =>
                    filename.match(/\/watch-history\.json$/)
                  )[0]
              )
            )
          } catch (error) {
            progressSetter('ready')
          }
          break
      }
      await storeWatchHistories(
        validateHistoryies(JSON.parse(jsonText)),
        progressSetter
      )
      console.log('done')
    },
    acceptTypeList: ['.json', '.zip'],
  }

  return (
    <FileUploader.Drop {...uploadConfig}>
      <FileUploader.Dialog {...uploadConfig}>
        <PrimaryButton text="再生履歴を追加" />
      </FileUploader.Dialog>
    </FileUploader.Drop>
  )
}

export default UploadButton
