export default {
    getH5Url(config, URI='', domain = false) {
        let domainUrl = config.find(item => {
            return item.Key == 'H5.Server.Host'
        });
        if (domain) {
            return domainUrl.Value
        } else {
            let subUrl = URI.split('?URL=')[1];
            let url = decodeURIComponent(`${domainUrl.Value}/${subUrl}`);
            return url;
        }
    }
}
