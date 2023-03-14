import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import Text from 'src/view/components/atoms/Text'
import InitPage from '../util/InitPage'
import styled from 'styled-components'

const Privacy: React.FC = () => {
  return (
    <ColumnContent maxWidth="640px">
      <InitPage />
      <Text color={color.black} size={fontSize.regular}>
        <h2>プライバシーポリシー</h2>
        Diawel（以下，「作者」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，利用者の皆さま（以下，「ユーザー」といいます。）の個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
        <h3>第1条（個人情報の収集）</h3>
        <ol>
          <li>
            作者は，ユーザーに関する，IPアドレスなどの個人を特定することにつながるデータを収集することがあります。
          </li>
          <li>
            本サービスでは，Googleによるアクセス解析ツール「
            <A
              href="https://analytics.google.com/"
              rel="noforrow"
              target="_blank"
            >
              Google アナリティクス
            </A>
            」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており，個人を特定するものではありません。
            <br />
            この機能はCookieを無効にすることで収集を拒否することが出来ますので，お使いのブラウザの設定をご確認ください。この規約に関しての詳細は{' '}
            <A
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              rel="noforrow"
              target="_blank"
            >
              Google アナリティクス利用規約
            </A>{' '}
            ページや{' '}
            <A
              href="https://policies.google.com/technologies/ads?hl=ja"
              rel="noforrow"
              target="_blank"
            >
              Google ポリシーと規約
            </A>{' '}
            ページをご覧ください。
          </li>
          <li>
            作者は，本サービスで収集したいかなるデータも，連動する外部のサービスに送信することがあります。
          </li>
        </ol>
        <h3>第2条（個人情報を収集・利用する目的）</h3>
        作者が個人情報を収集・利用する目的は，以下のとおりです。
        <ol>
          <li>サービスの提供・運営のため</li>
          <li>
            利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
          </li>
          <li>上記の利用目的に付随する目的</li>
        </ol>
        <h3>第3条（利用目的の変更）</h3>
        作者は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
        <h3>第4条（プライバシーポリシーの変更）</h3>
        <ol>
          <li>
            本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          </li>
          <li>
            作者が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
          </li>
        </ol>
        <p style={{ textAlign: 'right' }}>以上</p>
      </Text>
    </ColumnContent>
  )
}

const A = styled.a`
  display: inline;
  color: ${color.black};
  text-decoration: underline;
`

export default Privacy
