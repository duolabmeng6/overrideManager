package main

import (
	"changeme/action"
	"changeme/myModel"
	"context"
	"github.com/duolabmeng6/goefun/ecore"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetVersion() string {
	println("GetVersion", myModel.Version)
	return myModel.Version
}
func (a *App) E检查更新() string {
	myModel.E检查更新()
	return "ok"
}

func (a *App) E启动服务器(配置内容 string) string {
	_, err := action.Run_override(配置内容)
	if err != nil {
		return err.Error()
	}
	return "已启动"
}

func (a *App) E停止服务器() string {
	action.Stop_override()
	return "已停止"
}

func (a *App) E写到文件(文件路径 string, 写出数据 string) error {
	err := ecore.E写到文件(文件路径, []byte(写出数据))
	return err
}
func (a *App) E读入文本(文件路径 string) string {
	data := ecore.E读入文本(文件路径)
	return data
}
