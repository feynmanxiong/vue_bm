<template>
  <el-container class="flex_col_str">
    <el-header class="header">
      <el-menu
        :default-active="editableTabsValue"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#0085d5"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <span class="logo"></span>
        <el-submenu v-for="item in list" :index="item.title" :key="item.module">
		  <div class="elMenuTriangle"></div>
		  <template slot="title"><span class="bold">{{item.title}}</span></template>					
		  <template v-for="child in item.children">
			<el-menu-item :index="child.title" @click="showTab(child)"  v-if="!child.hasOwnProperty('children')">
				{{child.title}}
			</el-menu-item>
			<el-submenu class="baseMenu" :index="child.title" v-if="!!child.hasOwnProperty('children')">
			  <template slot="title">{{child.title}}</template>
			  <template v-for="i in child.children">
				<el-menu-item :index="i.title" @click="showTab(i)" v-if="!i.hasOwnProperty('children')">
				  {{i.title}}
				</el-menu-item>
				<el-submenu class="baseMenu" :index="i.title" v-if="!!i.hasOwnProperty('children')">
				  <template slot="title">{{i.title}}</template>
				  <el-menu-item v-for="i_ in i.children" :key="i_.module" :index="i_.title" @click="showTab(i_)">
					{{i_.title}}
				  </el-menu-item>
				</el-submenu>
			  </template>
			</el-submenu>
		  </template>
		</el-submenu>
        <el-row type="flex" justify="space-between" align="middle" class="person text-right mar-r-20">
          <el-col :span="6"></el-col>
          <el-col>
            <el-dropdown @command="handleCommand" trigger="click" :hide-on-click="false">
              <span class="el-dropdown-link white">
                {{ name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
    <el-main class="main">
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" lazy>
        <el-tab-pane class="tab_content none" :closable="false" label="首页" name="首页">
		  <keep-alive>
			<component ref="首页" is="home"></component>
		  </keep-alive>
		</el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :index="index"
        >{{item.content}}
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      name: "feynman",
    //   activeIndex: "1",
      editableTabsValue: "首页",
      editableTabs: [],
      list: [		
					{
						title: "审批管理",
						name: "审批管理",	
						module: '1',				
						children: [
							{title: "合同审批管理",name: "合同审批管理",module: '6',content: "approvalContract"},
							{title: "合同审批编辑",name: "合同审批编辑",module: '7',content: "approvalContractAdd"},
							{title: "费用报批管理",name: "费用报批管理",module: '937',content: "approvalCost"},
							{title: "费用报批编辑",name: "费用报批编辑",module: '937',content: "approvalCostEdit"},
							{title: "驾驶舱",name: "驾驶舱",module: '937',content: "cockpit"}
						]
					},										
					{
						title: "价格管理",
						name: "价格管理",	
						module: '2',
						children: [
							{title: "价格协议管理",name: "价格协议管理",module: '8',content: "priceManagement"},
							{title: "价格协议编辑",name: "价格协议编辑",module: '9',content: "priceEdit"},
							{title: "费用控制管理",name: "费用控制管理",module: '968',content: "rateManagement"},		
							{title: "费用控制编辑",name: "费用控制编辑",module: '968',content: "rateEdit"}					
						]
					},
					{
						title: "供应商管理",
						module: '3',					
						children: [
							{title: "客户供应商管理",module: '10',	content: "supplierCustomer"},
							{title: "客户供应商编辑",module: '11',	content: "supplierCustomerEdit"}
						]
					},
					{
						title: "业务管理",
						name: "业务管理",		
						module: '1109',				
						children: [
							{title: "业务台账管理",name: "业务台账管理",module: '1109',content: "businessLedgerManagement"},
							{title: "业务台账编辑",name: "业务台账编辑", module: '1109',children:[
								{title: "货运代理",name: "货运代理",module: '1109',children:[
									{title: "集装箱进口",name: "集装箱进口",module: '1109',content: "ledgerChildContainerImport"},
									{title: "集装箱出口",name: "集装箱出口",module: '1109',content: "ledgerChildContainerExport"},
									{title: "散货进口",name: "散货进口",module: '1109113',content: "ledgerChildBulkImport"},
									{title: "散货出口",name: "散货出口",module: '1109114',content: "ledgerChildBulkExport"},
									{title: "集装箱进出港/站",name: "集装箱进出港/站",module: '1109115',content: "ledgerChildContanierEandLPort"},
									{title: "散货进出港/站",name: "散货进出港/站",module: '1109116',content: "ledgerChildBulkEandLPort"}
								]},
								{title: "船务代理",name: "船务代理",module: 'A',children:[
									{title: "船代进口",name: "船代进口",module: '1109121',content: "shippingEgencyImport"},
									{title: "船代出口",name: "船代进口",module: '1109122',content: "shippingEgencyExport"}
								]},
								{title: "仓储物流",name: "仓储物流",module: 'B',children:[
									{title: "国内仓储本地",name: "国内仓储本地",module: '1109131',content: "domesticWarehouseNative"},
									{title: "国内仓储异地",name: "国内仓储异地",module: '1109132',content: "domesticWarehouseOffsite"}
								]}
							]},
							{title: "应收对账",name: "应收对账",module: 'C',content: "businessReceivables"},
							{title: "应付对账",name: "应付对账",module: 'D',content: "businessPayable"},
							{title: "收款确认管理",name: "收款确认管理",module: 'E',content: "businessReceiptConfirmManagement"},
							{title: "收款确认编辑",name: "收款确认编辑",module: 'F',content: "businessReceiptConfirmEdit"},
							{title: "付款申请管理",name: "付款申请管理",module: 'G',content: "businessPaymentApplyManagement"},
							{title: "付款申请编辑",name: "付款申请编辑",module: 'H',content: "businessPaymentApplyEdit"},
							{title: "分摊费用管理",name: "分摊费用管理",module: 'I',content: "businessShareCostsManagement"},
							{title: "业务报表",name: "业务报表",module: 'J',children:[
								{title: "业务量统计表",name: "业务量统计表",module: 'K',content: "reportsChildBusinessStatistics"},
								{title: "应收未到账",name: "应收未到账",module: 'L',content: "reportsChildReceivableUncollected"},
								{title: "应付未到账",name: "应付未到账",module: 'M',content: "reportsChildPaymentUncollected"}
							]},						
						]
					},	
					{
						title: "商务结算",
						name: "商务结算",
						module: '1110',				
						children: [
							{title: "单票费用管理",name: "单票费用管理",module: '1110',content: "singleTicketFeeManagement"},
							{title: "单票费用编辑",name: "单票费用编辑",module: 'i',content: "singleTicketFeeEdit"},
							{title: "应收发票管理",name: "应收发票管理",module: 'j',content: "invoiceReceivableManagement"},
							{title: "应收发票编辑",name: "应收发票编辑",module: 'k',content: "invoiceReceivableEdit"},
							{title: "应付发票管理",name: "应付发票管理",module: 'l',content: "payableManagement"},
							{title: "应付发票编辑",name: "应付发票编辑",module: 'm',content: "payableEdit"},
							{title: "收款核销管理",name: "收款核销管理",module: 'n',content: "receiptVerification"},
							{title: "收款核销编辑",name: "收款核销编辑",module: 'o',content: "receiptEdit"},
							{title: "付款核销管理",name: "付款核销管理",module: 'p',content: "paymentVerification"},
							{title: "付款核销编辑",name: "付款核销编辑",module: 'q',content: "paymentEdit"},
							{title: "商务报表",name: "商务报表",module: 'w',children:[
								{title: "成本利润表",name: "成本利润表",module: 'r',content: "costProfitStatement"},
								{title: "信控逾期表",name: "信控逾期表",module: 's',content: "creditControlOverdueStatement"},
								{title: "应收到账率表",name: "应收到账率表",module: 't',content: "receivableStatement"},
								{title: "往来账明细表",name: "往来账明细表",module: 'u',content: "currentAccountDetailStatement"},
								{title: "补收补付清单",name: "补收补付清单",module: 'v',content: "supplymentryReceiptAndPaymentList"}
							]}
							
						]
					},	
					{
						title: "财务登记",
						name: "财务登记",	
						module: '1111',				
						children: [
							{title: "收款登记管理",name: "收款登记管理",module: '1111',content: "collectionRegistrationManagement"},
							{title: "收款登记编辑",name: "收款登记编辑",module: 'b',content: "collectionRegistrationEdit"},
							{title: "付款登记管理",name: "付款登记管理",module: 'c',content: "paymentRegistrationManagement"},
							{title: "付款登记编辑",name: "付款登记编辑",module: 'd',content: "paymentRegistrationEdit"},
							{title: "财务报表",name: "财务报表",module: 'e',children: [
								{title: "利润登记表",name: "利润登记表",module: 'f',content: "profitRegistrationTable"},
								{title: "财务账龄表",name: "财务账龄表",module: 'g',content: "financialAgingTable"}
							]}							
						]
					},	
					{
						title: "基础资料",
						name: "基础资料",	
						module: '4',					
						children: [
							{
								title: "业务基础资料",
								name: "业务基础资料",
								module: '12',	
								children:[
									// {title: "结算公司维护",	content: "basicsSettle"},
									{title: "港口维护",name: "港口维护",content: "basicsRecordPort",module:"14"},
									{title: "航线维护",name: "航线维护",content: "basicsRecordRoute",module:"15"},
									{title: "船名维护",name: "船名维护",content:"basicsRecordBoat",module:"16"},
									{title: "品名维护",name: "品名维护",content: "productName",module:"17"},
									{title: "装箱点维护",name: "装箱点维护",content:"packingPointMaintain",module:"18"},
									{title: "送箱点维护",name: "送箱点维护",content:"givePointMaintain",module:"19"},
									{title: "还箱点维护",name: "还箱点维护",content:"backPointMaintain",module:"20"},
									{title: "箱型对应关系",name: "箱型对应关系",content:"boxRelationship",module:"21"},
								]
							},
							{
								title: "商务基础资料",	
								name: "商务基础资料",							
								module: '13',
								children: [
									{title: "开票类型税率",name: "开票类型税率",module: '22',content: "basicsMerchantInvoice"},
									{title: "费用科目维护",name: "费用科目维护",module: '23',content: "basicsMerchantCost"},
									{title: "价格条件字段",name: "价格条件字段",module: '24',content: "basicsMerchantTax"}
								]
							},

						],
					},
					{
							title: "权限管理",
							name: "权限管理",	
							module: '5',
							children: [
								{title: "用户管理",name: "用户管理",module: '25',content: "powerUser"},
								{title: "角色管理",name: "角色管理",module: '26',content: "powerRole"},
								{title: "部门管理",name: "部门管理",module: '27',content: "department"},
								// {title: "demo",content: "demo" }
							]
						}
					
				],
    };
  },
  methods: {
    //添加tab
    addTab(targetName) {
      for(let tab of this.editableTabs){
          if(tab.name == targetName.name){
            this.editableTabsValue = targetName.name;
            return;
          }
      }
      this.editableTabs.push({
        name: targetName.name,
        title: targetName.title,
        content: targetName.content
      })   
      this.editableTabsValue = targetName.title;
    },
    //移除tab
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    //展示tab
    showTab(path){
      for(let item of this.editableTabs) {
		if(item.name == path) {
		  this.current_tab = path;
		//   this.$store.dispatch("changeFunc",null)
		  return;
		}
	  }
	  this.addTab(path);
    },
    //person
    handleCommand(command) {
      if (command == "logout") {
        alert("logout");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.flex_col_str {
  height: 100%;
  .header {
    .logo {
      float: left;
      width: 120px;
      height: 40px;
      margin-top: 10px;
      margin-left: 20px;
      margin-right: 10px;
      background: url("./assets/log.png") no-repeat;
      background-size: cover;
    }
    .person{
        height: 60px;
        line-height: 60px;
    }
  }
  .main {
    height: 100%;
    background: #ccc;
  }
}
</style>
