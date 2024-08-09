package main

import (
	"bytes"
	"changeme/action"
	"changeme/myModel"
	"context"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/duolabmeng6/goefun/etool"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"sync"
	"time"
)

// App struct
type App struct {
	ctx       context.Context
	mu        sync.Mutex
	ticker    *time.Ticker
	logBuffer bytes.Buffer
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.ticker = time.NewTicker(1000 * time.Millisecond)
	//a.logBuffer = bytes.Buffer
	go func() {
		for range a.ticker.C {
			fmt.Println("ticker")
			a.mu.Lock() // 锁定缓冲区，避免竞态条件
			if a.logBuffer.Len() > 0 {
				fmt.Print(a.logBuffer.String()) // 使用fmt.Print而不是println
				jsonstring := etool.E到Json(map[string]string{
					"logs": a.logBuffer.String(),
				})
				runtime.EventsEmit(a.ctx, "logs", jsonstring)
				a.logBuffer.Reset()
			}
			a.mu.Unlock() // 解锁缓冲区
		}
	}()

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
	_, err := action.Run_override(配置内容, &a.logBuffer)
	if err != nil {
		return err.Error()
	}
	//defer a.ticker.Stop()
	jsonstring := etool.E到Json(map[string]string{
		"logs": "已启动服务器",
	})
	runtime.EventsEmit(a.ctx, "logs", jsonstring)
	return "启动成功"
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
func (a *App) E取运行目录() string {
	data := ecore.E取运行目录()
	return data
}
