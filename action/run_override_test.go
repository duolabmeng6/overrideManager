package action

import (
	"bytes"
	"fmt"
	"github.com/duolabmeng6/goefun/ecore"
	"sync"
	"testing"
	"time"
)

func Test_run_override(t *testing.T) {
	var logBuffer bytes.Buffer
	// 输出捕获的日志
	var mu sync.Mutex

	configContent := ecore.E读入文本("/Users/ll/Desktop/2024/override2ui/action/config.json")
	//_, _ := Run_override(configContent)
	Run_override(configContent, &logBuffer)
	// 使用time.Ticker定期检查logBuffer
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	// 使用goroutine异步处理日志输出
	go func() {
		for range ticker.C {
			mu.Lock() // 锁定缓冲区，避免竞态条件
			if logBuffer.Len() > 0 {
				fmt.Print(logBuffer.String()) // 使用fmt.Print而不是println
				logBuffer.Reset()
			}
			mu.Unlock() // 解锁缓冲区
		}
	}()

	//println(ok, err.Error())
	//time.Sleep(time.Second * 1)
	//eh := ehttp.NewHttp()
	//text, err := eh.Get("http://127.0.0.1:8181/models")
	//println(text, err)
	//time.Sleep(time.Second * 2)
	//Stop_override()
	//
	//time.Sleep(time.Second * 3)
	//ok, err = Run_override(configContent)
	//println(ok, err)
	//time.Sleep(time.Second * 1)
	//text, err = eh.Get("http://127.0.0.1:8181/models")
	//println(text, err)
	time.Sleep(time.Second * 30)
	//Stop_override()

}
