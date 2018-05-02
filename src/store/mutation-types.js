//公用
export const SET_SLIDE = 'SET_SLIDE'  //
export const SET_ANALOG_USER = 'SET_ANALOG_USER' //设置模拟用户，app使用H5时处在登录状态
export const SET_USERINFO = 'SET_USERINFO'  //设置个人信息
export const TAB_LOGIN_CHOOSE = 'TAB_LOGIN_CHOOSE'  //切换组件登录 登录或注册
export const SHOW_GLOBAL_LOGIN = 'SHOW_GLOBAL_LOGIN'  //显示全局登录组件
export const SHOW_GLOBAL_FORGET = 'SHOW_GLOBAL_FORGET'  //显示全局忘记密码组件
export const SET_INDEXCONFIG = 'SET_INDEXCONFIG' //设置网站基本信息
export const SET_ACCOUNT_BALANCE = 'SET_ACCOUNT_BALANCE'  //设置账户余额
export const SET_USERINFO_AVATAR = 'SET_USERINFO_AVATAR'  //设置头像
export const SET_REGISET_ARGREEMENT = 'SET_REGISET_ARGREEMENT'  //设置是否显示全局注册协议
// 首页
export const SET_WELCOME_BANNER = 'SET_WELCOME_BANNER'  //设置首页banner


// 我要理财
export const SET_PROJECTS_TYPE = 'SET_PROJECTS_TYPE' //设置投资项目的产品分类
export const SET_PROJECTS_RATE = 'SET_PROJECTS_RATE' //设置投资项目的年化利率
export const SET_PROJECTS_CYCLE = 'SET_PROJECTS_CYCLE' //设置投资项目的投资期限
export const CHOOSE_PROJECTS_STATUS = 'CHOOSE_PROJECTS_STATUS' //选中投资项目的产品分类
export const CHOOSE_PROJECTS_TYPE = 'CHOOSE_PROJECTS_TYPE' //选中投资项目的产品分类
export const CHOOSE_PROJECTS_RATE = 'CHOOSE_PROJECTS_RATE' //选中投资项目的年化利率
export const CHOOSE_PROJECTS_CYCLE = 'CHOOSE_PROJECTS_CYCLE' //选中投资项目的投资期限
export const CHOOSE_PROJECTS_SORT = 'CHOOSE_PROJECTS_SORT' //选中投资项目的投资期限
export const SET_PROJECTS_LIST = 'SET_PROJECTS_LIST' //设置投资项目列表
export const SET_PROJECTS_TOTAL = 'SET_PROJECTS_TOTAL' //设置投资项目总条数
export const CHANGE_PROJECTS_PAGE = 'CHANGE_PROJECTS_PAGE' //改变投资项目页数

export const TAB_PROJECTS = 'TAB_PROJECTS'  //切换 投资项目/债权转让
export const CHOOSE_CREDITOR_CLASS = 'CHOOSE_CREDITOR_CLASS'  //选中转让状态
export const SET_CREDITOR_LIST = 'SET_CREDITOR_LIST' //设置债权转让列表
export const SET_CREDITOR_TOTAL = 'SET_CREDITOR_TOTAL' //设置债权转让总条数
export const CHANGE_CREDITOR_PAGE = 'CHANGE_CREDITOR_PAGE' //改变债权转让页数
export const SET_ASSIGNINFO_INFO = 'SET_ASSIGNINFO_INFO'  //设置债权转让的信息
export const SET_PROJECTS_SCREEN = 'SET_PROJECTS_SCREEN'  //设置我要理财筛选框是否显示隐藏
export const LOAD_PROJECTS = 'LOAD_PROJECTS'  //是否加载过投资项目
export const LOAD_CREDITOR = 'LOAD_CREDITOR' //是否加载过债权转让

//投资项目详情
export const CHANGE_PACKET = 'CHANGE_PACKET'  //显示或隐藏红包
export const SET_PROJECTINFO_INFO = 'SET_PROJECTINFO_INFO'  //设置投资项目详情
export const SET_PROJECT_INFO_ALLPAY = 'SET_PROJECT_INFO_ALLPAY'  //设置是否一键满标
export const SET_PACKET = 'SET_PACKET'  //设置红包列表
export const SET_PROJECTINFO_MONEY = 'SET_PROJECTINFO_MONEY'  //设置投资金额
export const CLEAR_CHOOSE_PACKET = 'CLEAR_CHOOSE_PACKET'  //清空选中的红包
export const SELECT_PACKET = 'SELECT_PACKET'  //选中红包
export const CANCEL_PACKET = 'CANCEL_PACKET'  //取消选中红包

//债权转让详情
export const SET_CREDITOR_INFO = 'SET_CREDITOR_INFO'  //设置债权转让详情

//新闻、公告
export const CHANGE_NEWS = 'CHANGE_NEWS' //选择新闻或者公告
export const CHANGE_NOTICE_TYPE = 'CHANGE_NOTICE_TYPE'   //切换公告类型
export const SET_NEWS_LIST = 'SET_NEWS_LIST'  //设置新闻列表
export const CHANGE_NEWS_PAGE = 'CHANGE_NEWS_PAGE' //改变新闻列表页数
export const LOAD_NOTICE = 'LOAD_NOTICE'  //是否加载公告
export const LOAD_NEWS = 'LOAD_NEWS'  //是否加载新闻
export const SET_NOTICE_LIST = 'SET_NOTICE_LIST'  //设置新闻列表
export const SET_NEWS_TOTAL = 'SET_NEWS_TOTAL'  //设置新闻总条数
export const CHANGE_NOTICE_PAGE = 'CHANGE_NOTICE_PAGE' //改变公告列表页数
export const SET_NOTICE_TOTAL = 'SET_NOTICE_TOTAL'  //设置公告总条数

//投资记录
export const CHANGE_RECORD = 'CHANGE_RECORD' //选择投资项目或者债权承接
export const LOAD_RECORD_CREDITOR = 'LOAD_RECORD_CREDITOR'  //是否加载债权承接
export const SET_RECORD_PROJECTS_LIST = 'SET_RECORD_PROJECTS_LIST'  //设置投资项目列表
export const SET_RECORD_PROJECTS_TOTAL = 'SET_RECORD_PROJECTS_TOTAL'  //设置投资项目总条数
export const CHANGE_RECORD_PROJECTS_PAGE = 'CHANGE_RECORD_PROJECTS_PAGE'  //改变投资项目的页码

export const SET_RECORD_CREDITOR_LIST = 'SET_RECORD_CREDITOR_LIST'  //设置债权承接列表
export const SET_RECORD_CREDITOR_TOTAL = 'SET_RECORD_CREDITOR_TOTAL'  //设置债权承接总条数
export const CHANGE_RECORD_CREDITOR_PAGE = 'CHANGE_RECORD_CREDITOR_PAGE'  //改变债权承接的页码

//收益记录
export const CHANGE_GAIN = 'CHANGE_GAIN' //选择待收收益或者已收收益
export const LOAD_GAIN = 'LOAD_GAIN'  //是否加载已收收益

export const SET_INCOME_LIST = 'SET_INCOME_LIST'  //设置待收收益列表
export const SET_INCOME_TOTAL = 'SET_INCOME_TOTAL'  //设置待收收益总条数
export const CHANGE_INCOME_PAGE = 'CHANGE_INCOME_PAGE'  //改变待收收益的页码
export const SET_INCOME_TOTAL_MONEY = 'SET_INCOME_TOTAL_MONEY'  //总待收本息

export const SET_RECEIVED_LIST = 'SET_RECEIVED_LIST'  //设置已收收益列表
export const SET_RECEIVED_TOTAL = 'SET_RECEIVED_TOTAL'  //设置已收收益总条数
export const CHANGE_RECEIVED_PAGE = 'CHANGE_RECEIVED_PAGE'  //改变已收收益的页码
export const SET_RECEIVED_TOTAL_MONEY = 'SET_RECEIVED_TOTAL_MONEY'  //累计已收本息

//帮助中心、联系我们
export const SHOW_HELP_INFO = 'SHOW_HELP_INFO'  //是否显示帮助中心详情页
export const SHOW_COMMON_INFO = 'SHOW_COMMON_INFO'  //是否显示常见问题详情页
export const SHOW_CONTACT_INFO = 'SHOW_CONTACT_INFO'  //是否显示联系我们详情页

//消息中心
export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST'  //设置消息列表
export const SET_MESSAGE_LIST_TOTAL = 'SET_MESSAGE_LIST_TOTAL'  //设置消息列表总条数
export const SET_PERSONAL_MEASSAGE_PAGE = 'SET_PERSONAL_MEASSAGE_PAGE'  //设置个人消息页码
export const SET_PLATFORM_MEASSAGE_PAGE = 'SET_PLATFORM_MEASSAGE_PAGE'  //设置平台消息页码

//银行卡
export const SET_CHANGE_CARD = 'SET_CHANGE_CARD'  //设置修改的银行卡信息

//债权转让
export const TAB_ASSIGNLIST = 'TAB_ASSIGNLIST'  //切换债权转让
export const LOAD_TRANSFERRING = 'LOAD_TRANSFERRING'  //是否加载转让中
export const LOAD_TRANSFERRED = 'LOAD_TRANSFERRED'//是否加载已转让

export const SET_TRANSFER_LIST = 'SET_TRANSFER_LIST'  //设置债权转让列表
export const SET_TRANSFER_TOTAL = 'SET_TRANSFER_TOTAL'  //设置债权转让总条数
export const CHANGE_TRANSFER_PAGE = 'CHANGE_TRANSFER_PAGE'  //改变债权转让的页码

export const SET_TRANSFER_INFO = 'SET_TRANSFER_INFO'  //设置要修改的债权转让