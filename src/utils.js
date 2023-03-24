import { useI18n } from "vue-i18n";

export default {

  renderSize(value) {
    if (undefined === value || null == value || value === '' || value <= 0) {
      return "0 Bytes";
    }
    let unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0;
    let srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    let size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + ' ' +unitArr[index]
  },

  timeFormatText(value) {
    const i18n = useI18n()
    if (value === undefined || value <= 0) {
      return '-'
    }
    let timestamp = value
    let now = Math.round(new Date().getTime() / 1000)
    if (value.toString().length === 13) {
      timestamp = Number.parseInt(value.toString().substr(0, 10))
    }
    let diff = now - timestamp
    let postfix = diff > 0 ? i18n.t('ago') : i18n.t('later')
    diff = Math.abs(diff)
    let arrDay = [ i18n.t('years'), i18n.t('months'), i18n.t('weeks'), i18n.t('days'), i18n.t('hours'), i18n.t('minutes'), i18n.t('seconds')]
    let arrSecond = [31536000, 2592000, 6404800, 86400, 3600, 60, 1]
    for (let i = 0; i < 7; i++) {
      let inm = Math.floor(diff / arrSecond[i])
      if (inm !== 0) {
        return inm + arrDay[i] + postfix
      }
    }
  }
}
