/**
 * Created by hp on 2018/7/18.
 */
import React from 'react'
import WrappedRegistrationForm from '../js/register'
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,Modal } from 'antd';
import { shallow, configure ,mount} from 'enzyme'
import  Adapter from 'enzyme-adapter-react-14';
import ReactTestUtils from 'react-addons-test-utils'
//import ReactTestUtils from'react-dom/test-utils';
configure({ adapter: new Adapter() });

const setup = () => {
    // 模拟 props
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
    return {
        props,
        wrapper
    }
}

describe('WrappedRegistrationForm', () => {
    const {wrapper, props} = setup();

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
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
       // const showModalMock =jest.fn();
       /* const wrapperB = mount(
            <Button onClick={props.showModal}/>
        );*/
        const buttonDom=wrapper.find('Button').at(0);
      //  expect(wrapper.prop[0]).toBe();
        buttonDom.simulate('click');
        expect(props.showModal).toBeCalled;
        expect(wrapper.find('visible').exists());
      //  wrapper.find('#first').first().simulate('click');
    });
    it('Form Component should click', () => {
        
        const formDom=wrapper.find('Form').first();
        formDom.simulate('submit');
        expect(props.handleSubmit).toBeCalled;
    });


});