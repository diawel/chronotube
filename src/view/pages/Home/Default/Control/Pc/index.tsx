import styled from 'styled-components'
import Option from './Option'
import { mlString } from 'src/common/utils/switchLanguages'

const Pc: React.FC = () => {
  return (
    <Wrapper>
      <Option
        linkTo="/updatesubscription"
        text={mlString({
          ja: '登録チャンネルを更新',
          en: 'Update subscriptions',
        })}
      />
      <Option
        linkTo="/addhistory"
        text={mlString({
          ja: '再生履歴を追加',
          en: 'Add watch history',
        })}
      />
      <Option
        linkTo="/backup"
        text={mlString({
          ja: '再生履歴をバックアップ',
          en: 'Backup watch history',
        })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 36px 0 60px;
  margin-bottom: 16px;
  display: flex;
  overflow: auto;
`

export default Pc
