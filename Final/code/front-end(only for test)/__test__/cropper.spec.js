/**
 * Created by hp on 2018/7/19.
 */
import React from 'react'
import Crop from '../js/Cropper'
import Cropper from 'react-cropper';
import {Button,Input,Icon} from 'antd'
import toJson from 'enzyme-to-json';
import { shallow, configure,render,mount } from 'enzyme'
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
    const wrapper = shallow(<Crop />)

    return {
        props,
        wrapper,
    }
};
describe('Cropper render', () => {
   const {wrapper,props}=setup();
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
    it('basic use', () => {
        const wrapperS = render(
            <Crop {...props} />
        );
        expect(toJson(wrapperS)).toMatchSnapshot();
    });

/*describe('function',()=>{
    const {props,wrapperM}=setup();
 it('Button Component should click', () => {
 const buttonDom=wrapperM.find('Button').at(0);
 buttonDom.simulate('click');
 expect(props.load).toBeCalled;
 });

*/
});
 describe('function',()=> {
    const src = 'child.jpg';
    const {props} = setup();
    const wrapperM = shallow(<Crop {...props}/>);

    it('Button Component should click', () => {
        const buttonDom = wrapperM.find('Button').at(1);
        buttonDom.simulate('click');
        expect(props.useDefaultImage).toBeCalled;
    });
   /* it('Button2 Component should click', () => {

        const mockEvent={
            src: src,
            ref: 'cropper'
        }
        const buttonDom = wrapperM.find('Button').at(2);
        buttonDom.simulate('click',mockEvent);
        expect(props.cropImage).toBeCalled;
    });*/
});