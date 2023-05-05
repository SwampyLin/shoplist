//資料的部分
let itemurl =
  'https://awiclass.monoame.com/api/command.php?type=get&name=itemdata'
let shoplist = {}

shoplist.name = 'MyBuylist 購物清單'
shoplist.time = '2023/2/17'
shoplist.list = [
  { name: '吹風機', price: 300 },
  { name: '麥克風', price: 9000 },
  { name: '筆記型電腦', price: 54555 },
  { name: 'phone9', price: 32000 },
  { name: '神奇海螺', price: 5000 }
]

$.ajax({
  url: itemurl,
  success: function (res) {
    shoplist.list = JSON.parse(res)
    showlist()
  }
})

//處理的部分
//模版

let item_html =
  "<li id={{id}} class='buy-item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-del-id='{{delid}}'class='btn-del'>X</div></li>"
let total_html =
  "<div id='items-list'><li class='buy-item total'>總價<div class='price'>{{price}}</div></li>"

function showlist() {
  $('#items-list').html('')
  let total_price = 0
  for (let i = 0; i < shoplist.list.length; i++) {
    let item = shoplist.list[i]
    let item_id = 'buyitem' + i
    let del_item_id = 'del_buyitem_' + i
    total_price += parseInt(item.price)
    let current_item_html = item_html
      .replace('{{num}}', i + 1)
      .replace('{{item}}', item.name)
      .replace('{{id}}', item_id)
      .replace('{{del_id}}', del_item_id)
      .replace('{{price}}', item.price)
      .replace('{{delid}}', i)
    $('#items-list').append(current_item_html)
    //btn-del此時才出現
    $('#' + del_item_id).click(function () {
      remove_item($(this).attr('data-del-id'))
    })
  }
  let current_total_html = total_html.replace('{{price}}', total_price)
  $('#items-list').append(current_total_html)
}

showlist()

$('.btn-add').click(function () {
  shoplist.list.push({
    name: $('#input-name').val(),
    price: $('#input-price').val()
  })
  $('#input-name').val('')
  $('#input-price').val('')
  showlist()
})

function remove_item(id) {
  shoplist.list.splice(id, 1)
  showlist()
}
