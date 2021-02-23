import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

const BASE = '';

// 登录
export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/login', user, 'POST');

//jsonp请求天气
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    const cityCode = 440100;
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=0cd74b48e662a1477f7f7fac2257ce9d`;
    jsonp(url, {}, (err, data) => {
      //console.log(err, data);
      if (!err && data.info === 'OK') {
        //console.log(data.lives[0].weather);
        resolve(data.lives[0]);
      } else {
        message.error('获取天气失败！');
      }
    });
  });
};
//reqWeather();
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */

// 获取一级/二级分类列表
export const reqCategorys = parentId => ajax(BASE + '/manage/category/list',{ parentId: parentId })

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add',{ categoryName, parentId },'POST')

// 更新分类名
export const reqUpdateCategory = ({ parentId, categoryName }) => ajax(BASE + '/manage/category/update',{ categoryId: parentId, categoryName },'POST')

// 获取分类
export const reqCategory = categoryId => ajax(BASE + '/manage/category/info',{categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list',{ pageNum, pageSize })

// 更新商品状态 上架/下架
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus',{ productId, status },'POST')

// 搜索商品分页列表 searchType 搜索类型 productName/productDesc
export const reqSearchProducts = ({ pageNum, pageSize=2, searchName, searchType }) => 
  ajax(BASE + '/manage/product/search',{ pageNum, pageSize, [searchType]: searchName })