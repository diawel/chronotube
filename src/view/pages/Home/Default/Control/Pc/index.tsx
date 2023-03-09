import styled from 'styled-components'
import Option from './Option'

const Pc: React.FC = () => {
  return (
    <Wrapper>
      <Option linkTo="/updatesubscription" text="登録チャンネルを更新" />
      <Option linkTo="/addhistory" text="再生履歴を追加" />
      <Option linkTo="/backup" text="再生履歴をバックアップ" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 60px;
  margin-bottom: 16px;
`

export default Pc
