import renderer, {act} from 'react-test-renderer';
import  App from '../App';

describe('App', () => {
  it('App render', async() => {
    const promise = Promise.resolve()
    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
    await act(() => promise)
  });
});
jest.useFakeTimers(); 