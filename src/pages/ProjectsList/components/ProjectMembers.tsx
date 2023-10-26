import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, message, Space, Tag, theme, Tooltip } from 'antd';
import { isValidEmail } from '../../../utilities/Email';
import { useDispatch } from 'react-redux';
import { setTeamMembers } from '../../../redux/projectSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';



const ProjectMembers = ( ) => {

  const { token } = theme.useToken();
  const {teamMembers: members} = useSelector((state: RootState)=> state.project)
  //const [members, setMembers] = useState(myMembers?myMembers:[] as string[]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const dispatch = useDispatch()


  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

 


  const handleClose = (removedMember: string) => {
    const newMembers = members.filter((member) => member !== removedMember); 
    //setMembers(newMembers);
    dispatch(setTeamMembers(newMembers))

  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !members.includes(inputValue)) {
        if(!isValidEmail(inputValue)){
            message.error('Email not valid')
            return
        }
      //setMembers([...members, inputValue]);
      dispatch(setTeamMembers([...members, inputValue]))
      
       
     
    }
    setInputVisible(false);
    setInputValue('');
  };

 

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newMembers = [...members];
    newMembers[editInputIndex] = editInputValue;
    //setMembers(newMembers);
    dispatch(setTeamMembers(newMembers))
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const memberInputStyle: React.CSSProperties = {
    width: 164,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  };

  const memberPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <Space size={[0, 8]} wrap>
      {members.map((member, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={member}
              size="small"
              style={memberInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongMember = member.length > 20;
        const memberElem = (
          <Tag
            key={member}
            closable
            style={{ userSelect: 'none' }}
            onClose={() => handleClose(member)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(member);
                  e.preventDefault();
                }
              }}
            >
              {isLongMember ? `${member.slice(0, 20)}...` : member}
            </span>
          </Tag>
        );
        return isLongMember ? (
          <Tooltip title={member} key={member}>
            {memberElem}
          </Tooltip>
        ) : (
          memberElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={memberInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={memberPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Member
        </Tag>
      )}
    </Space>
  );
};

export default ProjectMembers;