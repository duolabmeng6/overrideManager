package action

import (
	"github.com/duolabmeng6/goefun/ecore"
	"github.com/duolabmeng6/goefun/ehttp"
	"testing"
	"time"
)

func Test_run_override(t *testing.T) {
	configContent := ecore.E读入文本("/Users/ll/Desktop/2024/override2ui/action/config.json")
	ok, err := Run_override(configContent)
	println(ok, err)
	time.Sleep(time.Second * 1)
	eh := ehttp.NewHttp()
	text, err := eh.Get("http://127.0.0.1:8181/models")
	println(text, err)
	time.Sleep(time.Second * 2)
	Stop_override()

	time.Sleep(time.Second * 3)
	ok, err = Run_override(configContent)
	println(ok, err)
	time.Sleep(time.Second * 1)
	text, err = eh.Get("http://127.0.0.1:8181/models")
	println(text, err)
	time.Sleep(time.Second * 3)
	Stop_override()

}
