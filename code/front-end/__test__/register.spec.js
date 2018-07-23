/**
 * Created by hp on 2018/7/18.
 */
import React from 'react'
import WrappedRegistrationForm from '../js/register'
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,Modal } from 'antd';
import { shallow,render, configure ,mount} from 'enzyme'
import  Adapter from 'enzyme-adapter-react-14';

//import ReactTestUtils from'react-dom/test-utils';
configure({ adapter: new Adapter() });

/*const setup = () => {
    // 模拟 props

    return {
        props,
        wrapper
    }
}*/

describe('WrappedRegistrationForm', () => {
  //  const {wrapper, props} = setup();
    const props = {
        // Jest 提供的mock 函数
        state :{
            confirmDirty: false,
            autoCompleteResult: [],
            visible:false,
        },
        showModal: jest.fn(),
        handleSubmit:jest.fn((e) => {
        }),
        handleConfirmBlur:jest.fn((e) => {
        }),
        compareToFirstPassword:jest.fn(),
        validateToNextPassword:jest.fn(),
        handleOk: jest.fn((e) => {
        }),
        handleCancel: jest.fn((e) => {
        })
    }
    const wrapper = mount(<WrappedRegistrationForm {...props}/>)
    // case1
    // 通过查找是否存在 Input,测试组件正常渲染
    it('WrappedRegistrationForm Component should render', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
        expect(wrapper.find('Input').exists());
        expect(wrapper.find('Form').exists());
        expect(wrapper.find('Modal').exists());
        expect(wrapper.find('Button').exists());
        expect(wrapper.find('Icon').exists());

    });
    it(' Component should render', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
        expect(wrapper.find('layout').exists());
    });
    it('WrappedRegistrationForm Component should click', () => {
        const buttonDom=wrapper.find('Button').at(0);
        buttonDom.simulate('click');
        expect(props.showModal).toBeCalled;
        expect(wrapper.find('visible').exists());
    });
    it('Form Component should click', () => {
        const handleSubmit=jest.fn((e)=>{
        });
       const wrapperS = mount(
            <Form onSubmit={handleSubmit}/>
        );
        const formDom=wrapperS.find('Form').at(0);
        formDom.simulate('submit');
        expect(handleSubmit).toBeCalled;
    });

});
/*describe('Input',()=>{
    const props ={
        state:{
            confirmDirty: false,
            autoCompleteResult: [],
            visible:false,
        },
        handleConfirmBlur:jest.fn((e) => {
        }),
    };
    const wrapperInput=render(<WrappedRegistrationForm />);
    it('Input Component should blur', () => {
        const inputDom=wrapperInput.find('Input').at(1);
        inputDom.simulate('blur');
        expect(props.handleConfirmBlur).toBeCalled;
    });
})*/