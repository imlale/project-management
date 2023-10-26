import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Space, Tag, theme, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { setTaskData } from '../redux/taskSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const TaskTags = ({ tags : myTags, quantity = 99, editable = false }: { tags: string[], quantity?: number, editable?: boolean }) => {

    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const {taskData} = useSelector((state: RootState) => state.task) 
    let tags = taskData.tags??myTags??[]
    
    //const [tags, setTags] = useState(myTags??[]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    /*useEffect(()=>{       
   
      tags.length>0 && editable && dispatch(setTaskData({tags}))
    }, [tags])*/

    useEffect(()=>{
         tags = myTags    
    }, [myTags])
  
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
  
    useEffect(() => {
      editInputRef.current?.focus();
    }, [editInputValue]);
  
    const handleClose = (removedTag: string) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
    
      //setTags(newTags);
      dispatch(setTaskData({tags: newTags}))
    };
  
    const showInput = () => {
      setInputVisible(true);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleInputConfirm = () => {
      if (inputValue && !tags.includes(inputValue)) {
        dispatch(setTaskData({tags: [...tags, inputValue]}))
        //setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
  
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditInputValue(e.target.value);
    };
  
    const handleEditInputConfirm = () => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      dispatch(setTaskData({tags: newTags}))
      //setTags(newTags);
      setEditInputIndex(-1);
      setEditInputValue('');
    };
  
    const tagInputStyle: React.CSSProperties = {
      width: 64,
      height: 22,
      marginInlineEnd: 8,
      verticalAlign: 'top',
    };
  
    const tagPlusStyle: React.CSSProperties = {
      height: 22,
      //background: token.colorBgContainer,
      borderStyle: 'dashed',
    };

    const tagStyle: React.CSSProperties = {
        lineHeight: "1.5rem",
        display: "inline-block",
        borderRadius: "2rem",    
        border: 0    
        
    }
  

    return (
        <Space size={[0, 8]} style={{ margin: "0.5rem 0", flexWrap: "wrap" }}>
          {tags.map((tag, index) => {
            if(index >= quantity) return
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                color={token.colorPrimary}
                closable={editable}
                style={{...tagStyle,  userSelect: 'none' }}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => { 
                    if(!editable) return                   
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();                    
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            editable && <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
              New Tag
            </Tag>
          )}
        </Space>
      );
}



export default TaskTags