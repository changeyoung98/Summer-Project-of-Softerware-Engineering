/**
 * Created by hp on 2018/7/19.
 */
import React from 'react'
import Cropper from '../js/Cropper'
import {Button,Input,Icon} from 'antd'
import toJson from 'enzyme-to-json';
import { shallow, configure,render } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-14';

configure({ adapter: new Adapter() });
const setup = () => {
    // 模拟 props
    const src = 'child.jpg';
    const props = {
        // Jest 提供的mock 函数
        state : {
        src,
        cropResult: null,
    },
    cropImage : jest.fn(),
    onChange :jest.fn(),
    useDefaultImage :jest.fn(),
    load :jest.fn()
    };
    const wrapper = shallow(<Cropper />)
    return {
        props,
        wrapper
    }
}
describe('Cropper render', () => {
   const {wrapper,props}=setup();
    it('basic use', () => {
        const wrapper = render(
            <Cropper style={{ height: 400, width: '100%' }} />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
        it('Button Component should render', () => {
            //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
            // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
            expect(wrapper.find('Button').length).toBe(4);
        });
    it('Input Component should render', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
        expect(wrapper.find('input').length).toBe(1);
    });
    it('image Component should render', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
        expect(wrapper.find('img').length).toBe(1);
    });
});