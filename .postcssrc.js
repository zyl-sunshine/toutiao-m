/* postcss的配置文件 */

module.exports = {
  // 配置要使用的postcss插件
  plugins: {
    //   配置使用autoprefixer插件
    // 作用:生成浏览器css样式规则前缀
    // 运行时出现警告的原因:VueCli内部已经配置了autoprefixer插件,又配置了一次,所以产生了冲突
    // autoprefixer: {  //autoprefixer插件的配置
    // // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    'postcss-pxtorem': {
      // lib-flexble的 rem适配方案:把一行分为10份,每份就是十分之一,所以rootValue 应该设置为设计稿宽度的十分之一
      // 设计稿是750,所以应该设置为750 / 10 =75
      // 但是vant 建议设置为37.5,vant是基于375写的,所以必须设置为37.5,唯一的缺点就是使用我们设计稿的尺寸都必须/2
      //解决方法:
      //   如果是vant的样式,就按照37.5来转换
      //   如果是自己的样式,就按照75来转换
      // rootValue支持两种类型:
      //   数字:固定的数值
      //   函数:可以动态处理返回
      //  postcss-pxtorem处理每个css文件的时候都会来调用这个函数
      //  它可以把被处理的css文件相关的信息通过参数传递给该函数
      //   rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      //   配置要转换的css属性
      // * 表示所有属性
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
