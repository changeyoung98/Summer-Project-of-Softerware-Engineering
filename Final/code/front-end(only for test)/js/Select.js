
import React from 'react'
import {Select} from 'antd'

const Option = Select.Option;

class Selection extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(value) {
    console.log(`selected ${value}`);
  }



render(){
        return(
            <div>
            <div style={{  float: 'left'}}>
                <h4>Sex</h4>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select sex"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="unknown">Unknown</Option>
            </Select>
                <h4>Age</h4>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select age"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="baby">Baby(0~1)</Option>
                    <Option value="toddler">Toddler(1~3)</Option>
                    <Option value="preschooler">Preschooler(3~6)</Option>
                    <Option value="schoolchild">Schoolchild(6~13)</Option>
                    <Option value="teenager">Teenager(13~19)</Option>
                    <Option value="young adult">Young Adult(19~40)</Option>
                    <Option value="middle age">Middle Age(40~60)</Option>
                    <Option value="old">Old People(≥60)</Option>
                </Select>
                <h4>Height</h4>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select height"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="≤155">≤155</Option>
                    <Option value="155~165">155~165</Option>
                    <Option value="165~175">165~175</Option>
                    <Option value="175~185">175~185</Option>
                    <Option value="185~195">185~195</Option>
                    <Option value="≥195">≥195</Option>
                </Select>
                <h4>Build</h4>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select build"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="thin">Thin</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="fat">Fat</Option>
                </Select>
                <h4>Hairstyle</h4>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select hairstyle"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="bald">Bald</Option>
                    <Option value="crew cut">Crew cut</Option>
                    <Option value="short">short</Option>
                    <Option value="shoulder-length">Shoulder-length</Option>
                    <Option value="pony-tail">Pony-tail</Option>
                </Select>
                <h4>Colour of clothes</h4>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select colour"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="black">Black</Option>
                    <Option value="white">White</Option>
                    <Option value="grey">Grey</Option>
                    <Option value="red">Red</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="yellow">Yellow</Option>
                    <Option value="green">Green</Option>
                    <Option value="orange">Orange</Option>
                    <Option value="purple">Purple</Option>
                    <Option value="pink">Pink</Option>
                </Select>
            </div>
            <div style={{  float: 'right'}}>
                <img style={{ width: '50%' }} src="child.jpg" alt="cropped image" />
            </div>
            </div>
        )
}
}

export default Selection;