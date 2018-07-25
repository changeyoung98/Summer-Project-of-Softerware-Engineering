/**
 * Created by hp on 2018/7/24.
 */
import React from 'react'
import WrappedRegistrationForm from '../js/register'
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,Modal } from 'antd';
import { shallow,render, configure ,mount} from 'enzyme'
import  Adapter from 'enzyme-adapter-react-14';

//import ReactTestUtils from'react-dom/test-utils';
configure({ adapter: new Adapter() });
describe('Input',()=>{
    const props ={
        state:{
            confirmDirty: false,
            autoCompleteResult: [],
            visible:false,
        },
        handleConfirmBlur:jest.fn((e) => {
        }),
    };
    const wrapperInput=mount(<WrappedRegistrationForm />);
    it('Input Component should blur', () => {
        const inputDom=wrapperInput.find('Input').at(1);
      /*  inputDom.simulate('blur');
        expect(props.handleConfirmBlur).toBeCalled;*/
    });
})