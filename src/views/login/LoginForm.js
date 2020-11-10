import React,{Component,Fragment} from "react";
//css
import "./index.scss"
//ANTD
import { Form, Input, Button,Row, Col,message   } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import {validate_password,valid_email} from "../../utils/validate";
//api
import {Login,GetCode} from "../../api/account"
class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username:"",
            code_button_loading:false,
            code_button_disabled:false,
            code_button_text:'获取验证码'
        };
        //react没有双向数据绑定;

    }//登录
    onFinish = (values) => {
        Login().then(response =>{  //resolve
            console.log(response)
        }).catch(error =>{    //reject

        })
        console.log('Received values of form: ', values);
    };
    //input处理

    inputChange = (e) =>{
        let value = e.target.value
        this.setState({
            username:value
        })
    };
    //倒计时
    countDown=() =>{
        //定时器
        let timer = null;
        //倒计时间
        let sec = 60;
        //修改状态
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            code_button_text:`${sec}S`
        })

        timer = setInterval(() =>{
            console.log(111)
            sec--;
            if(sec<=0){
                this.setState({
                    code_button_text:`重新获取`,
                    code_button_disabled:false,
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text:`${sec}S`
            })
        },1000)
        //setInterval \ clearInterval()不间断定时器
        //setTimeout \ clearTimeout 只执行一次

    }
    toggleForm = (values) => {
        this.props.switchForm("register")
    };
    //获取验证码
    getCode = ()=>{
        if(!this.state.username){
            message.warning('邮箱不能为空',1)
            return  false;
        }
        this.setState({
            code_button_loading:true,
            code_button_text:'发送中'
        })
        const requestData = {
            username:this.state.username,
            module:"login"
        }
        GetCode().then(response =>{
            //执行倒计时
            this.countDown();
        }).catch(error =>{
            this.setState({
                code_button_loading:false,
                code_button_text:'重新获取'
            })
        })
    };
    render(){
        const{username,code_button_loading,code_button_text,code_button_disabled} = this.state;
        const _this = this;
       return (

               <Fragment>
                   <div className="from-header">
                       <h4 className="column">登录</h4>
                       <span onClick={this.toggleForm}>账号注册</span>
                   </div>
                   <div className="form-content">
                       <Form
                           name="normal_login"
                           className="login-form"
                           initialValues={{remember: true}}
                           onFinish={this.onFinish}
                       >
                           <Form.Item name="username"
                                      rules={[{required: true, message: '邮箱不能为空！'},
                                          {type:"email",message: '邮箱格式有误'}]}
                                          //判断邮箱格式是否正确
                                          // ({getFieldValue})=>({
                                          //   validator(rule,value){
                                          //       if(valid_email(value)){
                                          //           _this.setState({
                                          //               code_button_disabled: false
                                          //           })
                                          //           return Promise.resolve();
                                          //       }
                                          //
                                          //       return Promise.reject('邮箱格式不正确');
                                          //     },
                                          // })
                                          //]}
                                      >
                               <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="email"/>
                           </Form.Item>
                           <Form.Item name="password"
                                      rules={[{required: true, message: '密码不能为空!'},
                                          // ({ getFieldValue }) => ({//ES6结构
                                          //     validator(rule, value) {
                                          //         console.log(getFieldValue('password'))
                                          //         if (!value || getFieldValue('password') === value) {
                                          //             return Promise.resolve();
                                          //         }
                                          //         return Promise.reject('The two passwords that you entered do not match!');
                                          //     },
                                          // }),

                                          {pattern:validate_password,message:'字母+数字，大于6位小于20位'}]}>
                               <Input prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="password"/>
                           </Form.Item>
                           <Form.Item name="code"
                                      rules={[{required: true, message: '验证码不能为空'},{len:6,message: '请输入长度为6位的验证码'}]}>
                               <Row gutter={13}>
                                   <Col span={15}>
                                       <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                                              placeholder="Code"/>
                                   </Col>
                                   <Col span={9}>
                                       <Button type="danger" onClick={this.getCode}  disabled={code_button_disabled} loading={code_button_loading} block>{code_button_text}</Button>
                                   </Col>
                               </Row>
                           </Form.Item>
                           <Form.Item>
                               <Button type="primary" htmlType="submit" className="login-form-button" block>
                                   登录
                               </Button>
                           </Form.Item>
                       </Form>
                   </div>
               </Fragment>
        )
    }
}

export default LoginForm;