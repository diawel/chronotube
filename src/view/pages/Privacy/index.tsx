import { color } from 'src/common/styles/color'
import { fontSize } from 'src/common/styles/fontSize'
import ColumnContent from 'src/view/components/templates/ColumnContent'
import Text from 'src/view/components/atoms/Text'
import InitPage from '../../components/utils/InitPage'
import styled from 'styled-components'
import { mlString } from 'src/common/utils/switchLanguages'

const Privacy: React.FC = () => {
  return (
    <ColumnContent maxWidth="640px">
      <InitPage
        pageTitle={`${mlString({
          ja: 'プライバシーポリシー',
          en: 'Privacy Policy',
        })} | Chronotube`}
      />
      <Text color={color.black} size={fontSize.regular}>
        <h2>プライバシーポリシー</h2>
        <A href="mailto:contact@diawel.me" target="_blank">
          Diawel
        </A>
        （以下，「作者」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，利用者の皆さま（以下，「ユーザー」といいます。）の個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
        <h3>第1条（個人情報の収集）</h3>
        作者は，ユーザーに関する，IPアドレスなどの個人を特定することにつながるデータを収集することがあります。
        <h3>第2条（個人情報を収集・利用する目的）</h3>
        作者が個人情報を収集・利用する目的は，以下のとおりです。
        <ol>
          <li>サービスの提供・運営のため</li>
          <li>
            利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
          </li>
          <li>上記の利用目的に付随する目的</li>
        </ol>
        <h3>第3条（個人情報の利用目的の変更）</h3>
        作者は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
        <h3>第4条（連動する外部のサービス）</h3>
        <ol>
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
            </A>
            ページや{' '}
            <A
              href="https://policies.google.com/technologies/ads"
              rel="noforrow"
              target="_blank"
            >
              Google ポリシーと規約
            </A>
            ページをご覧ください。
          </li>
          <li>
            本サービスでは，YouTube Data API
            v3を利用して、ユーザーのYouTube利用に関する情報を収集することができます。このサービスを利用するユーザーは、{' '}
            <A
              href="https://www.youtube.com/t/terms"
              rel="noforrow"
              target="_blank"
            >
              YouTube 利用規約
            </A>
            、並びに、
            <A
              href="https://policies.google.com/privacy"
              rel="noforrow"
              target="_blank"
            >
              Google プライバシー ポリシー
            </A>
            に同意したものとみなします。このアクセスは、{' '}
            <A
              href="https://security.google.com/settings/security/permissions"
              rel="noforrow"
              target="_blank"
            >
              Google API セキュリティ設定ページ
            </A>
            から、取り消すことができます。
          </li>
          <li>
            YouTube Data API v3
            を通じて、第三者が広告を含むコンテンツを配信することがあります。
          </li>
          <li>
            作者は，本サービスで収集したいかなるデータも，連動する外部のサービスに送信することがあります。
          </li>
        </ol>
        <h3>第5条（プライバシーポリシーについての問い合わせ）</h3>
        ユーザーは、作者に対して{' '}
        <A href="mailto:contact@diawel.me" target="_blank">
          contact@diawel.me
        </A>{' '}
        宛てのメールにより、問い合わせを行うことができます。
        <h3>第6条（プライバシーポリシーの変更）</h3>
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
