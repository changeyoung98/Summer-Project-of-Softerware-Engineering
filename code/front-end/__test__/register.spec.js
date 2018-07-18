/**
 * Created by hp on 2018/7/18.
 */
import React from 'react'
import WrappedRegistrationForm from '../js/register'
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,Modal } from 'antd';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-14';

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
        showModal: jest.fn((e) => {
        }),
    }
    const wrapper = shallow(<WrappedRegistrationForm {...props} />)
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
    it('WrappedRegistrationForm Component should click', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html

        expect(wrapper.find('visible').exists());
        wrapper.find('#first').first().simulate('click');

    })
})