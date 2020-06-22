import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import createChaiEnzyme from 'chai-enzyme'
import createChaiJestDiff from 'chai-jest-diff'
import {configure as configureEnzyme} from 'enzyme'
import dirtyChai from 'dirty-chai'

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(createChaiEnzyme())

configureEnzyme({ adapter: new Adapter()})