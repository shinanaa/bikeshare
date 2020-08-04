import React from 'react'
import {Card, Button, Modal} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import draft from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class Rich extends React.Component {
    state={
        showRichText: false,
        editorState: ''
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    onEditorChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    render() {
        const {editorState} = this.state
        return(
            <div style={{width: "100%"}}>
                <Card>
                    <Button type='primary' onClick={this.handleClearContent} style={{marginRight: 10}}>清空内容</Button>
                    <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title='富文本编辑器'>
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title='富文本内容'
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                >
                    {draft(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}