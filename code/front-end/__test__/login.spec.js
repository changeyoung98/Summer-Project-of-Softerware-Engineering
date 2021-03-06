import React from 'react'
import {Input,Modal,Icon} from 'antd'
import WrappedRegistrationForm from '../js/register'
import Login from '../js/login'
import { shallow, configure,mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-14';

configure({ adapter: new Adapter() });


const setup = () => {
    // 模拟 props
    const props = {
        // Jest 提供的mock 函数
        state:{

            visible: true,
            username: null,
            password: null,
            result: -1,
        },
        handle1: jest.fn((e) => {
        }),
        handle2: jest.fn((e) => {
        }),
        handleOk: jest.fn((e) => {
        }),
        handleCancel: jest.fn((e) => {
        }),
        login:jest.fn()
    };
    const wrapper = shallow(<Login {...props} />)
    return {
        props,
       wrapper
    }
}

describe('Login', () => {
    const {wrapper, props} = setup();

    // case1
    // 通过查找是否存在 Input,测试组件正常渲染
    it('Login Component should render', () => {
        //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
       expect(wrapper.find('Input').length).toBe(2);
        expect(wrapper.find('Modal').exists());
        expect(wrapper.find('WrappedRegistrationForm').exists());
    });
    it('First Input Component should change', () => {
        const mockEvent={
            target:{
                value:"Amy"
            }
        }
       wrapper.find('Input').first().simulate('change',mockEvent);
        expect(props.handle1).toBeCalled;
    });
    it('Last Input Component should change', () => {
        const mockEvent={
            target:{
                value:"123456"
            }
        }
        wrapper.find('Input').last().simulate('change',mockEvent);
        expect(props.handle2).toBeCalled;
    });

})