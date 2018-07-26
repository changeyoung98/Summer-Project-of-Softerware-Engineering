/**
 * Created by hp on 2018/7/24.
 */
import React from 'react'
import Video from '../js/Video'
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
            now_camera: null,
            url: null,
            history: [],
            instance: [],
            currentTime: null,
            state: 0,
            camera:
                [
                    {
                        instance: "rtmp://192.168.0.120:1935/oflaDemo",
                        history: "http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4"
                    },
                    {
                        instance: "rtmp://192.168.0.120:1935/oflaDemo",
                        history: "http://localhost:8081/video/test.mp4"
                    }]
        },
        getVideo : jest.fn(),
        getVideoh: jest.fn(),
        get:jest.fn(),
        gets:jest.fn(),
    };
    const wrapper = shallow(<Video {...props}/>)

    return {
        props,
        wrapper,
    }
};

describe('Video render', () => {
    const {wrapper, props} = setup();
    it('basic uses', () => {
        const wrapperS = render(
            <Video {...props} />
        );
        expect(toJson(wrapperS)).toMatchSnapshot();
    });

    it('Button Component should render', () => {

        expect(wrapper.find('Button').length).toBe(3);
    });


   /* it('1 Component should click', () => {
       const  mockEvent={
           state:1,
           url:{
               instance: "rtmp://192.168.0.120:1935/oflaDemo",
              // history: "http://localhost:8081/video/test.mp4"
           },
        }
        const buttonDom = wrapper.find('Button').at(0);
        buttonDom.simulate('click',mockEvent);
        expect(props.get).toBeCalled;
    });*/
    it('2 Component should click', () => {
        const  mockEvent={
             state:1,
            url:{
                instance: "rtmp://192.168.0.120:1935/oflaDemo",
                 history: "http://localhost:8081/video/test.mp4"
            },
        }
        const buttonDom = wrapper.find('Button').at(1);
        buttonDom.simulate('click',mockEvent);
        expect(props.getVideoh).toBeCalled;
    });
    it('3 Component should click', () => {
        const buttonDom = wrapper.find('Button').at(2);
        buttonDom.simulate('click');
        expect(props.gets).toBeCalled;
    });
    it(' area Component should click', () => {
        const buttonDom = wrapper.find('area').at(0);
        buttonDom.simulate('click');
        expect(props.getVideo(1)).toBeCalled;
    });
    it('A Component should click', () => {
        const buttonDom = wrapper.find('Button').at(1);
        buttonDom.simulate('click');
        expect(props.getVideo(0)).toBeCalled;
    });
});