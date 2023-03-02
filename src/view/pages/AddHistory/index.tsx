import { useEffect, useState } from 'react'
import { storeWatchHistory } from 'src/common/utils/db/watchHistory'
import FileUploader, {
  FileUploaderPropsType,
} from 'src/view/components/atoms/FileUploader'
import PrimaryButton from 'src/view/components/molecules/PrimaryButton'
import ProgressButton from 'src/view/components/molecules/ProgressButton'
import ColumnContent from 'src/view/components/templates/ColumnContent'

const AddHistory: React.FC = () => {
  const [progress, setProgress] = useState(-1)
  const uploadConfig: FileUploaderPropsType = {
    fileSetter: async (files) => {
      if (!files.fileList[0]) return
      setProgress(0)
      let jsonText = ''
      switch (files.fileList[0].type) {
        case 'application/json':
          jsonText = await files.fileList[0].text()
          break
        case 'application/x-zip-compressed':
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
          break
      }
      storeWatchHistory(JSON.parse(jsonText)).then(() => {
        console.log('done')
        setProgress(-1)
      })
    },
    acceptTypeList: ['.json', '.zip'],
  }

  return (
    <ColumnContent>
      {progress == -1 ? (
        <FileUploader.Drop {...uploadConfig}>
          <FileUploader.Dialog {...uploadConfig}>
            <PrimaryButton text="再生履歴を追加" />
          </FileUploader.Dialog>
        </FileUploader.Drop>
      ) : (
        <ProgressButton text="再生履歴を読み込み中" progress={progress} />
      )}
    </ColumnContent>
  )
}

export default AddHistory
