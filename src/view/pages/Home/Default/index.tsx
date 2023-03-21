import StandardContent from 'src/view/components/templates/StandardContent'
import Abstract from './Abstract'
import Control from './Control'
import Gallery from './Gallery'

const Default: React.FC = () => {
  return (
    <StandardContent>
      <Abstract />
      <Control />
      <Gallery />
    </StandardContent>
  )
}

export default Default
