import React, { FC, ReactElement, useCallback, useEffect, useReducer,useState } from "react";
import { Form ,Input} from 'antd';
import './index.less'
import {ITodo} from '../../types'

interface IProps{
    addTodo: (todo:ITodo) => void,
    todoList: ITodo[],
    setShowAddCard:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddForm:FC<IProps> = ({addTodo,todoList,setShowAddCard}):ReactElement => {
    const [form] = Form.useForm();
    const [activeButton, setActiveButton] = useState<number>(0);
    const [tags, setTags] = useState<string[]>(Array(4).fill(''));
    const handleClickCancel = () => {
        form.resetFields();
        setTags([]);
        setShowAddCard(false);
    };
    const handleClickSubmit = () => {
        form.validateFields().then((values) => {
             console.log('All Field Values:', values);
             console.log("tags : ",tags,tags.filter((value) => value !== null && value !== undefined))
             addTodo({
                title:values.title,
                content:values.content,
                tags:tags.filter((value) => value !== null && value !== undefined && value !== ''),
                id: new Date().getTime(),
                completed: false
            })
            form.resetFields();
            setTags([])
            setShowAddCard(false);
        }).catch((error) => {
            console.error('Validation failed:', error);
        });
    };

    const handleTagButtonClick = (index: number) => {
        setActiveButton(index);
    };

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (activeButton !== null) {
          const newTags = [...tags];
          newTags[activeButton] = event.target.value;
          setTags(newTags);
        }
      };
    return (
        <>
            <div className="form_list">
                <Form
                    form={form}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="title">
                        <Input className="todo_controls_input" placeholder="Please enter a title."/>
                    </Form.Item>
                    <Form.Item name="content">
                        <Input.TextArea className="todo_controls_textArea" placeholder="Please enter a content." />
                    </Form.Item>
                    {tags.map((tag, index) => (
                        <>
                            {activeButton === index ? (
                                <Form.Item key={index} name={`Tag ${index + 1}`}>
                                    <Input value={tag} onChange={handleTagInputChange} className="todo_controls_input" placeholder={`Please enter tag ${index + 1}.`}/>
                                </Form.Item>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                    <Form.Item>
                    {
                        [0,1,2,3].map((item)=>{
                            return (<div className="tag_index_button" onClick={()=>{handleTagButtonClick(item)}}>{item+1}</div>)
                        })
                    }
                    </Form.Item>
                </Form>
            </div>
            <div className="buttons">
                <svg onClick={handleClickCancel} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.6196 16.1356L16.2843 24.7683M24.7683 24.6196L16.1356 16.2843M33.4009 32.9549C31.759 34.6554 29.7983 36.0158 27.6306 36.9585C25.4629 37.9012 23.1308 38.4078 20.7673 38.4492C18.4039 38.4906 16.0555 38.0661 13.8561 37.1999C11.6567 36.3337 9.64948 35.0428 7.94899 33.4009C6.24851 31.759 4.88807 29.7982 3.94536 27.6306C3.00265 25.4629 2.49613 23.1308 2.45471 20.7673C2.41329 18.4039 2.83779 16.0554 3.70398 13.8561C4.57016 11.6567 5.86105 9.64947 7.50297 7.94898C10.819 4.5147 15.3634 2.53835 20.1366 2.4547C24.9097 2.37105 29.5206 4.18696 32.9549 7.50295C36.3892 10.8189 38.3655 15.3634 38.4492 20.1365C38.5328 24.9097 36.7169 29.5206 33.4009 32.9549Z" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg onClick={handleClickSubmit} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.452 21.9517L18.952 26.4517L26.452 15.9517M38.452 20.4517C38.452 22.8155 37.9864 25.1561 37.0818 27.34C36.1772 29.5238 34.8513 31.5081 33.1799 33.1796C31.5084 34.851 29.5241 36.1769 27.3403 37.0815C25.1564 37.9861 22.8158 38.4517 20.452 38.4517C18.0882 38.4517 15.7475 37.9861 13.5637 37.0815C11.3798 36.1769 9.3955 34.851 7.72404 33.1796C6.05259 31.5081 4.72672 29.5238 3.82213 27.34C2.91755 25.1561 2.45197 22.8155 2.45197 20.4517C2.45197 15.6778 4.34839 11.0994 7.72404 7.72374C11.0997 4.34808 15.6781 2.45166 20.452 2.45166C25.2259 2.45166 29.8042 4.34808 33.1799 7.72374C36.5555 11.0994 38.452 15.6778 38.452 20.4517Z" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </div>
        </>
    )
}

export default AddForm