/**
 * Created by hp on 2018/7/24.
 */
import React from 'react'
import Play from '../js/Play'
import {Button} from 'antd'
import toJson from 'enzyme-to-json';
import { shallow, configure,render,mount } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-14';
configure({ adapter: new Adapter() });
const setup = () => {
    // 模拟 props

    const props = {
        // Jest 提供的mock 函数
        state : {
            currentTime:0,
        }
    };
    const wrapper = shallow(<Play {...props}/>)

    return {
        props,
        wrapper,
    }
};
describe('Video render', () => {
    const {wrapper, props} = setup();
    it('basic uses', () => {
        const wrapperS = render(
            <Play {...props} />
        );
        expect(toJson(wrapperS)).toMatchSnapshot();
    });
    it('Component should render',()=>{
        expect(wrapper.find('video').length).toBe(1);
    })
});