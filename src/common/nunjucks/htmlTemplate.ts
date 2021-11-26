import tpl from './htmlTemplateStr'



class htmlFilter {



    async getHtml(funStr: string): Promise<string> {
        try {
            let that = this
            let arg: any[] = []
            let funName = funStr.replace(/\((.*)\)/g, function ($1: string, $2: string) {
                arg = that.argFunc($2.trim())
                return ''
            })

            return tpl[funName].apply(null, arg)

        }
        catch (e) {
            return ''
        }


    }

    //方法参数处理
    argFunc(arg: string) {
        try {
            let i = 0
            let args: any = {}
            arg.replace(/({.*?})/ig, function ($1: string, $2: string): string {
                let istr = '{{' + i + '}}'

                args[istr] = $2
                i++

                arg = arg.replace($1, istr)
                return istr
            })

            let ary = arg.split(',')

            for (let s = 0; s < ary.length; s++) {
                ary[s] = ary[s].replace(/^("|')|("|')$/g, '')
                if (args[ary[s]]) {
                    ary[s] = eval(`(${args[ary[s]]})`)
                }
            }
            return ary
        } catch (e) {
            return []
        }


    }
}


let hFilter = new htmlFilter()

export default hFilter