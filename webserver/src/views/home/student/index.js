import React from 'react';
import { Table, Button, Modal, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import * as actions from './store/actionCreates';

class Student extends React.Component {
  columns = [
    {
      title: '学号',
      dataIndex: '_id'
    },
    {
      title: '姓名',
      dataIndex: 'studentName'
    },
    {
      title: '班级',
      dataIndex: 'gradeId.gradeName'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render(text, row, index) {
        return <div>{text ? '男' : '女'}</div>;
      }
    },
    {
      title: '操作',
      render: (text, row, index) => {
        return (
          <div>
            <Button onClick={this.props.handleOpenUpdate.bind(this, row._id)}>
              修改
            </Button>
            <Button
              type="danger"
              onClick={this.props.handleDelStudent.bind(this, row._id)}
            >
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  /**
   * 显示弹出框的方法
   * @param {Boolean} visible 是否显示
   */
  showModal = () => {
    let curStudentInfo =
      this.props.list.find(item => item._id === this.props.curStudentId) || {};

    let UpdateModal = props => {
      let { getFieldDecorator } = props.form;
      return (
        <Modal
          title="修改信息"
          visible={this.props.visible}
          onOk={() => {
            this.props.handleModalOK(props.form);
          }}
          onCancel={this.props.handleModalCancal}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 8 }}>
            <Form.Item label="学生姓名">
              {getFieldDecorator('studentName', {
                rules: [{ required: true, message: '学生姓名不能为空' }],
                initialValue: curStudentInfo.studentName
              })(<Input />)}
            </Form.Item>
            <Form.Item label="选择性别">
              {getFieldDecorator('gender', {
                initialValue: curStudentInfo.gender
              })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    };

    UpdateModal = Form.create({})(UpdateModal);
    return <UpdateModal />;
  };

  render() {
    return (
      <div>
        <div>学生</div>
        <Table
          rowKey="_id"
          dataSource={this.props.list}
          columns={this.columns}
        />
        {this.showModal(this.props.visible)}
      </div>
    );
  }

  componentDidMount() {
    this.props.handleGetStudentList();
  }
}

export default connect(
  ({ student }) => ({
    list: student.list,
    visible: student.visible,
    curStudentId: student.curStudentId
  }),
  dispatch => ({
    handleGetStudentList() {
      dispatch(actions.asyncStudentList());
    },
    handleDelStudent(id) {
      dispatch(actions.asyncDelStuden(id));
    },
    handleOpenUpdate(id) {
      // 1. 将id给修改
      dispatch(actions.onChgCurStudentId(id));
      // 2. 将弹窗给打开
      dispatch(actions.onChgVisible());
    },
    handleModalOK(form) {
      // 想要得到 form 表单的数据
      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 1. 派发动作
          dispatch(actions.asyncUpdStudent(values));
          // 2. 关闭弹窗
          dispatch(actions.onChgVisible());
        }
      });
    },
    handleModalCancal() {
      console.log(111);
      dispatch(actions.onChgVisible());
    }
  })
)(Student);
