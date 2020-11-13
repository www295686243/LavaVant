<template>
  <van-collapse v-model="activeNames" class="HelpText">
    <van-collapse-item name="0" title="原草互助是什么？">
      <p>原草互助是制造业便利的求职、招聘交流互联网平台，主要解决精准对接、便利快捷问题！</p>
      <p>在这里，发布招聘信息，招到合适的人，可以及时下架，避免持续浪费双方的时间！</p>
      <p>在这里，设定自己的行业和地区，有符合要求的求职，招聘信息通过公众号及时推送，不用自己天天查找！</p>
      <p>在这里，我们每条发布出去的信息，都是电话核对沟通过，当前还在招人，才会推送出去！师傅们联系的时候有招到了，可以投诉反馈，方便我们核实下架！有奖励的哦！</p>
      <p>在这里，大家互帮互助，帮别人招聘、求职，可以查看意向的工作或者岗位！ 双向互助！</p>
    </van-collapse-item>
    <van-collapse-item name="1" title="1、联系方式如何获得？">
      <p>点击【查看联系电话】按钮，初次查看需要手机验证码登录，设定行业和地区即可！</p>
    </van-collapse-item>
    <van-collapse-item name="2" title="2、为什么联系方式不能直接显示？">
      <p>为了方便，我们每个发布出来的信息都是电话沟通后，还在招我们才推送出来，也承诺了别人，招到了就下架，不能再有人持续打电话！</p>
      <p>也出于以下几个原因，所以需要查看：</p>
      <p>①、出于信息的安全性，赤裸裸的联系方式可能会被百度等收集到，大家的联系方式曝光，泄露隐私！</p>
      <p>②、为了精准给别人推荐，避免骚扰，只有发布求职，招聘的人才能获得赠送查看卷！</p>
      <p>③、避免一些劳务派遣中介的人大批量收集信息，欺骗企业或者工友！</p>
      <p>④、方便用户分享给其他求职或者招聘的朋友，让更多人招工、找工作更方便！</p>
    </van-collapse-item>
    <van-collapse-item name="3" title="3、查看联系方式的互助券如何获得？">
      <p>①、发布求职，每天登录获得1张求职卷，发布招聘的企业，每天登录获赠1张招聘卷！分别用来查看招聘和求职的联系方式的，目前大家迫切找工作，所以每天会多送一张，当天使用有效！</p>
      <p>②、首次通过手机验证码登录时，获得各3张的求职和招聘卷，满足大家迫切的需求！</p>
      <p>③、首次关注【原草互助】公众号，各赠送3张求职卷和招聘卷，同时关注后，会获得精准的求职招聘信息推送！</p>
      <p>④、转发任何一个求职、招聘的信息分享给朋友，有3个新朋友点击后即可获得1张求职券，可以用来查看求职或者招聘的联系方式！在原草互助平台上，帮助他人求职或招聘，就可以查看别人分享发布出来的求职或招聘联系方式，实现互帮互助！</p>
    </van-collapse-item>
    <van-collapse-item name="4" title="4、我在找工作，或者招人，平台会推荐和推广吗？">
      <p>原草互助是一个免费的互助求职招聘交流平台！发布求职，发布招聘免费，客服审核后，会按地区和行业精准推送给相关的人员，也会推送到十几个行业群！</p>
      <p>有意向的企业或者师傅直接与您联系，如果有招到了，即可操作下架，避免后续浪费双方时间！</p>
    </van-collapse-item>
    <van-collapse-item name="5" title="5、我怎么在平台上找工作？">
      <p>①、注册后关注【原草互助】公众号，有你意向的地区以及行业的工作会及时通过公众号推送给你！以及企业对您的简历有兴趣会给您投递招聘信息！</p>
      <p>②、可以在列表中查看、浏览招聘信息</p>
      <p>③、可以主动发布求职，尽量写的详细一点，方便企业招人联系</p>
      <p>④、相互分享，把别人需要的工作分享出去，别人也会把你求职的工作信息分享出去，互帮互助，是原草互助的宗旨！</p>
    </van-collapse-item>
    <van-collapse-item name="6" title="6、如何在平台上招聘？">
      <p>①、浏览求职信息，筛选意向的求职者联系</p>
      <p>②、发布招聘信息，尽量把待遇，地区，以及工作内容，生产的产品写清楚，方便求职者评估是否擅长，快速匹配到合适的人！</p>
      <p>③、注册后，关注【原草互助】公众号，平台会第一时间推送相关的求职信息！</p>
    </van-collapse-item>
    <van-collapse-item name="7" title="7、如何管理我发布的求职、招聘、以及查看过订单的联系方式？">
      <p>进入个人中心，选择相关板块查看！</p>
    </van-collapse-item>
    <van-collapse-item name="8" title="8、手机换号了，如何更换注册的手机号码？">
      <p>进入个人中心-设置，换绑手机号即可！</p>
    </van-collapse-item>
    <van-collapse-item name="9" title="9、换没有卷了，如何联系？">
      <p>如果没有互助卷，可以分享别人的求职招聘链接给朋友或者到行业群，有3个未进入过原草互助的朋友点击即可赠送，或者投递简历给招聘企业，让企业选择是否联系你！</p>
    </van-collapse-item>
    <van-collapse-item name="10" title="10、为什么推荐列表里没那么精准？">
      <p>推荐信息是根据您填写的行业和地区推荐的，重新设定缩小您的行业范围和地区即可！</p>
    </van-collapse-item>
    <van-collapse-item name="11" title="11、如何筛选我要的招聘、求职信息？">
      <p>通过岗位列表右上角的筛选功能，筛选相关的行业、地区即可检索！</p>
      <p>或者直接输入搜索关键词即可检索！</p>
    </van-collapse-item>
  </van-collapse>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Collapse, CollapseItem } from 'vant'

@Component({
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  }
})
export default class HelpText extends Vue {
  private activeNames = []
}
</script>

<style lang="less">
.HelpText {
  .van-cell__title {
    color: @text-link-color;
  }
  .van-collapse-item__content {
    color: @gray-7;
  }
}
</style>
