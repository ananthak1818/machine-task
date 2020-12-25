let sockets = require('../app').sockets;

var fetchUrl = require("fetch").fetchUrl;

function socketFn() {
    let obj;
    setInterval(() => {
        let url = 'https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=t8zCMSmmYbFpo2DnqoNCAw(('

        fetchUrl(url, async function (error, meta, body) {
            if (error) {
                console.log(error)
                throw error;
            } else {
                if (sockets.size != 0) {
                    for (const s of sockets) {
                        obj = {
                            data: JSON.parse(body.toString())
                        }
                        s.emit('chartSocket', obj);
                        // let finalData = await fetchData(JSON.parse(body.toString()).items)
                        // s.emit('tableArray', finalData)
                    }
                }
            }
        });
    }, 10000);

    const fetchData = async (data) => {
        let final = [];
        let count = 0
        return new Promise(async (resolve, reject) => {
            for (const element of data) {
                count = count + 1;
                let finalReq = await fetchFaq(element)
                final.push(finalReq)
            }
            resolve(final)
        })
    }

    const fetchFaq = (element) => {
        return new Promise((resolve, reject) => {
            fetchUrl(`https://api.stackexchange.com/2.2/tags/${element.name}/faq?site=stackoverflow&key=t8zCMSmmYbFpo2DnqoNCAw((`, function (error, meta, body) {
                if (error) {
                    console.log(error)
                } else {
                    resolve(JSON.parse(body.toString()))
                }
            })
        })
    }
}

module.exports = function () {
    socketFn()
}