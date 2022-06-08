(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Vendors_Pages_Software_AddSoftware_js"],{

/***/ "./node_modules/@uploadcare/upload-client/dist/index.browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@uploadcare/upload-client/dist/index.browser.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortController": () => (/* binding */ AbortController),
/* harmony export */   "UploadClient": () => (/* binding */ UploadClient),
/* harmony export */   "UploadClientError": () => (/* binding */ UploadClientError),
/* harmony export */   "UploadcareFile": () => (/* binding */ UploadcareFile),
/* harmony export */   "UploadcareGroup": () => (/* binding */ UploadcareGroup),
/* harmony export */   "base": () => (/* binding */ base),
/* harmony export */   "fromUrl": () => (/* binding */ fromUrl),
/* harmony export */   "fromUrlStatus": () => (/* binding */ fromUrlStatus),
/* harmony export */   "group": () => (/* binding */ group),
/* harmony export */   "groupInfo": () => (/* binding */ groupInfo),
/* harmony export */   "info": () => (/* binding */ info),
/* harmony export */   "multipartComplete": () => (/* binding */ multipartComplete),
/* harmony export */   "multipartStart": () => (/* binding */ multipartStart),
/* harmony export */   "multipartUpload": () => (/* binding */ multipartUpload),
/* harmony export */   "uploadBase": () => (/* binding */ uploadFromObject),
/* harmony export */   "uploadFile": () => (/* binding */ uploadFile),
/* harmony export */   "uploadFileGroup": () => (/* binding */ uploadFileGroup),
/* harmony export */   "uploadFromUploaded": () => (/* binding */ uploadFromUploaded),
/* harmony export */   "uploadFromUrl": () => (/* binding */ uploadFromUrl),
/* harmony export */   "uploadMultipart": () => (/* binding */ uploadMultipart)
/* harmony export */ });
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
class UploadClientError extends Error {
    constructor(message, code, request, response, headers) {
        super();
        this.name = 'UploadClientError';
        this.message = message;
        this.code = code;
        this.request = request;
        this.response = response;
        this.headers = headers;
        Object.setPrototypeOf(this, UploadClientError.prototype);
    }
}
const cancelError = (message = 'Request canceled') => {
    const error = new UploadClientError(message);
    error.isCancel = true;
    return error;
};

const onCancel = (signal, callback) => {
    if (signal) {
        if (signal.aborted) {
            Promise.resolve().then(callback);
        }
        else {
            signal.addEventListener('abort', () => callback(), { once: true });
        }
    }
};

const request = ({ method, url, data, headers = {}, signal, onProgress }) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const requestMethod = (method === null || method === void 0 ? void 0 : method.toUpperCase()) || 'GET';
    let aborted = false;
    xhr.open(requestMethod, url);
    if (headers) {
        Object.entries(headers).forEach((entry) => {
            const [key, value] = entry;
            typeof value !== 'undefined' &&
                !Array.isArray(value) &&
                xhr.setRequestHeader(key, value);
        });
    }
    xhr.responseType = 'text';
    onCancel(signal, () => {
        aborted = true;
        xhr.abort();
        reject(cancelError());
    });
    xhr.onload = () => {
        if (xhr.status != 200) {
            // analyze HTTP status of the response
            reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`)); // e.g. 404: Not Found
        }
        else {
            const request = {
                method: requestMethod,
                url,
                data,
                headers: headers || undefined,
                signal,
                onProgress
            };
            // Convert the header string into an array
            // of individual headers
            const headersArray = xhr
                .getAllResponseHeaders()
                .trim()
                .split(/[\r\n]+/);
            // Create a map of header names to values
            const responseHeaders = {};
            headersArray.forEach(function (line) {
                const parts = line.split(': ');
                const header = parts.shift();
                const value = parts.join(': ');
                if (header && typeof header !== 'undefined') {
                    responseHeaders[header] = value;
                }
            });
            const responseData = xhr.response;
            const responseStatus = xhr.status;
            resolve({
                request,
                data: responseData,
                headers: responseHeaders,
                status: responseStatus
            });
        }
    };
    xhr.onerror = () => {
        if (aborted)
            return;
        // only triggers if the request couldn't be made at all
        reject(new Error('Network error'));
    };
    if (onProgress && typeof onProgress === 'function') {
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                onProgress({
                    isComputable: true,
                    value: event.loaded / event.total
                });
            }
            else {
                onProgress({ isComputable: false });
            }
        };
    }
    if (data) {
        xhr.send(data);
    }
    else {
        xhr.send();
    }
});

function identity(obj) {
    return obj;
}

const transformFile = identity;
var getFormData = () => new FormData();

/**
 * FileData type guard.
 */
const isFileData = (data) => {
    return (data !== undefined &&
        ((typeof Blob !== 'undefined' && data instanceof Blob) ||
            (typeof File !== 'undefined' && data instanceof File) ||
            (typeof Buffer !== 'undefined' && data instanceof Buffer)));
};
/**
 * Uuid type guard.
 */
const isUuid = (data) => {
    const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
    const regExp = new RegExp(UUID_REGEX);
    return !isFileData(data) && regExp.test(data);
};
/**
 * Url type guard.
 *
 * @param {NodeFile | BrowserFile | Url | Uuid} data
 */
const isUrl = (data) => {
    const URL_REGEX = '^(?:\\w+:)?\\/\\/([^\\s\\.]+\\.\\S{2}|localhost[\\:?\\d]*)\\S*$';
    const regExp = new RegExp(URL_REGEX);
    return !isFileData(data) && regExp.test(data);
};

const isSimpleValue = (value) => {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'undefined');
};
const isObjectValue = (value) => {
    return !!value && typeof value === 'object' && !Array.isArray(value);
};
const isFileValue = (value) => !!value &&
    typeof value === 'object' &&
    'data' in value &&
    isFileData(value.data);
function collectParams(params, inputKey, inputValue) {
    if (isFileValue(inputValue)) {
        const name = inputValue.name;
        const file = transformFile(inputValue.data); // lgtm [js/superfluous-trailing-arguments]
        params.push(name ? [inputKey, file, name] : [inputKey, file]);
    }
    else if (isObjectValue(inputValue)) {
        for (const [key, value] of Object.entries(inputValue)) {
            if (typeof value !== 'undefined') {
                params.push([`${inputKey}[${key}]`, String(value)]);
            }
        }
    }
    else if (isSimpleValue(inputValue) && inputValue) {
        params.push([inputKey, inputValue.toString()]);
    }
}
function getFormDataParams(options) {
    const params = [];
    for (const [key, value] of Object.entries(options)) {
        collectParams(params, key, value);
    }
    return params;
}
function buildFormData(options) {
    const formData = getFormData();
    const params = getFormDataParams(options);
    for (const param of params) {
        formData.append(...param);
    }
    return formData;
}

const serializePair = (key, value) => typeof value !== 'undefined' ? `${key}=${encodeURIComponent(value)}` : null;
// TODO: generalize value transforming logic and use it here and inside `buildFormData`
const createQuery = (query) => Object.entries(query)
    .reduce((params, [key, value]) => {
    let param;
    if (typeof value === 'object' && !Array.isArray(value)) {
        param = Object.entries(value)
            .filter((entry) => typeof entry[1] !== 'undefined')
            .map((entry) => serializePair(`${key}[${entry[0]}]`, String(entry[1])));
    }
    else if (Array.isArray(value)) {
        param = value.map((val) => serializePair(`${key}[]`, val));
    }
    else {
        param = serializePair(key, value);
    }
    return params.concat(param);
}, [])
    .filter((x) => !!x)
    .join('&');
const getUrl = (base, path, query) => [
    base,
    path,
    query && Object.keys(query).length > 0 ? '?' : '',
    query && createQuery(query)
]
    .filter(Boolean)
    .join('');

/*
  Settings for future support:
  parallelDirectUploads: 10,
 */
const defaultSettings = {
    baseCDN: 'https://ucarecdn.com',
    baseURL: 'https://upload.uploadcare.com',
    maxContentLength: 50 * 1024 * 1024,
    retryThrottledRequestMaxTimes: 1,
    multipartMinFileSize: 25 * 1024 * 1024,
    multipartChunkSize: 5 * 1024 * 1024,
    multipartMinLastPartSize: 1024 * 1024,
    maxConcurrentRequests: 4,
    multipartMaxAttempts: 3,
    pollingTimeoutMilliseconds: 10000,
    pusherKey: '79ae88bd931ea68464d9'
};
const defaultContentType = 'application/octet-stream';
const defaultFilename = 'original';

var version = '3.1.1';

/**
 * Returns User Agent based on version and settings.
 */
function getUserAgent({ userAgent, publicKey = '', integration = '' } = {}) {
    const libraryName = 'UploadcareUploadClient';
    const libraryVersion = version;
    const languageName = 'JavaScript';
    if (typeof userAgent === 'string') {
        return userAgent;
    }
    if (typeof userAgent === 'function') {
        return userAgent({
            publicKey,
            libraryName,
            libraryVersion,
            languageName,
            integration
        });
    }
    const mainInfo = [libraryName, libraryVersion, publicKey]
        .filter(Boolean)
        .join('/');
    const additionInfo = [languageName, integration].filter(Boolean).join('; ');
    return `${mainInfo} (${additionInfo})`;
}

const SEPARATOR = /\W|_/g;
/**
 * Transforms a string to camelCased.
 */
function camelize(text) {
    return text
        .split(SEPARATOR)
        .map((word, index) => word.charAt(0)[index > 0 ? 'toUpperCase' : 'toLowerCase']() +
        word.slice(1))
        .join('');
}
/**
 * Transforms keys of an object to camelCased recursively.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function camelizeKeys(source) {
    if (!source || typeof source !== 'object') {
        return source;
    }
    return Object.keys(source).reduce((accumulator, key) => {
        accumulator[camelize(key)] =
            typeof source[key] === 'object' ? camelizeKeys(source[key]) : source[key];
        return accumulator;
    }, {});
}

/**
 * setTimeout as Promise.
 *
 * @param {number} ms Timeout in milliseconds.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultOptions = {
    factor: 2,
    time: 100
};
function retrier(fn, options = defaultOptions) {
    let attempts = 0;
    function runAttempt(fn) {
        const defaultDelayTime = Math.round(options.time * Math.pow(options.factor, attempts));
        const retry = (ms) => delay(ms !== null && ms !== void 0 ? ms : defaultDelayTime).then(() => {
            attempts += 1;
            return runAttempt(fn);
        });
        return fn({
            attempt: attempts,
            retry
        });
    }
    return runAttempt(fn);
}

const REQUEST_WAS_THROTTLED_CODE = 'RequestThrottledError';
const DEFAULT_RETRY_AFTER_TIMEOUT = 15000;
function getTimeoutFromThrottledRequest(error) {
    const { headers } = error || {};
    return ((headers &&
        Number.parseInt(headers['x-throttle-wait-seconds']) * 1000) ||
        DEFAULT_RETRY_AFTER_TIMEOUT);
}
function retryIfThrottled(fn, retryThrottledMaxTimes) {
    return retrier(({ attempt, retry }) => fn().catch((error) => {
        if ('response' in error &&
            (error === null || error === void 0 ? void 0 : error.code) === REQUEST_WAS_THROTTLED_CODE &&
            attempt < retryThrottledMaxTimes) {
            return retry(getTimeoutFromThrottledRequest(error));
        }
        throw error;
    }));
}

function getStoreValue(store) {
    return typeof store === 'undefined' ? 'auto' : store ? '1' : '0';
}

/**
 * Performs file uploading request to Uploadcare Upload API.
 * Can be canceled and has progress.
 */
function base(file, { publicKey, fileName, baseURL = defaultSettings.baseURL, secureSignature, secureExpire, store, signal, onProgress, source = 'local', integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes, metadata }) {
    return retryIfThrottled(() => {
        var _a;
        return request({
            method: 'POST',
            url: getUrl(baseURL, '/base/', {
                jsonerrors: 1
            }),
            headers: {
                'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
            },
            data: buildFormData({
                file: {
                    data: file,
                    name: (_a = fileName !== null && fileName !== void 0 ? fileName : file.name) !== null && _a !== void 0 ? _a : defaultFilename
                },
                UPLOADCARE_PUB_KEY: publicKey,
                UPLOADCARE_STORE: getStoreValue(store),
                signature: secureSignature,
                expire: secureExpire,
                source: source,
                metadata
            }),
            signal,
            onProgress
        }).then(({ data, headers, request }) => {
            const response = camelizeKeys(JSON.parse(data));
            if ('error' in response) {
                throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
            }
            else {
                return response;
            }
        });
    }, retryThrottledRequestMaxTimes);
}

var TypeEnum;
(function (TypeEnum) {
    TypeEnum["Token"] = "token";
    TypeEnum["FileInfo"] = "file_info";
})(TypeEnum || (TypeEnum = {}));
/**
 * Uploading files from URL.
 */
function fromUrl(sourceUrl, { publicKey, baseURL = defaultSettings.baseURL, store, fileName, checkForUrlDuplicates, saveUrlForRecurrentUploads, secureSignature, secureExpire, source = 'url', signal, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes, metadata }) {
    return retryIfThrottled(() => request({
        method: 'POST',
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        url: getUrl(baseURL, '/from_url/', {
            jsonerrors: 1,
            pub_key: publicKey,
            source_url: sourceUrl,
            store: getStoreValue(store),
            filename: fileName,
            check_URL_duplicates: checkForUrlDuplicates ? 1 : undefined,
            save_URL_duplicates: saveUrlForRecurrentUploads ? 1 : undefined,
            signature: secureSignature,
            expire: secureExpire,
            source: source,
            metadata
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

var Status;
(function (Status) {
    Status["Unknown"] = "unknown";
    Status["Waiting"] = "waiting";
    Status["Progress"] = "progress";
    Status["Error"] = "error";
    Status["Success"] = "success";
})(Status || (Status = {}));
const isErrorResponse = (response) => {
    return 'status' in response && response.status === Status.Error;
};
/**
 * Checking upload status and working with file tokens.
 */
function fromUrlStatus(token, { publicKey, baseURL = defaultSettings.baseURL, signal, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes } = {}) {
    return retryIfThrottled(() => request({
        method: 'GET',
        headers: publicKey
            ? {
                'X-UC-User-Agent': getUserAgent({
                    publicKey,
                    integration,
                    userAgent
                })
            }
            : undefined,
        url: getUrl(baseURL, '/from_url/status/', {
            jsonerrors: 1,
            token
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response && !isErrorResponse(response)) {
            throw new UploadClientError(response.error.content, undefined, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

/**
 * Create files group.
 */
function group(uuids, { publicKey, baseURL = defaultSettings.baseURL, jsonpCallback, secureSignature, secureExpire, signal, source, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes }) {
    return retryIfThrottled(() => request({
        method: 'POST',
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        url: getUrl(baseURL, '/group/', {
            jsonerrors: 1,
            pub_key: publicKey,
            files: uuids,
            callback: jsonpCallback,
            signature: secureSignature,
            expire: secureExpire,
            source
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

/**
 * Get info about group.
 */
function groupInfo(id, { publicKey, baseURL = defaultSettings.baseURL, signal, source, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes }) {
    return retryIfThrottled(() => request({
        method: 'GET',
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        url: getUrl(baseURL, '/group/info/', {
            jsonerrors: 1,
            pub_key: publicKey,
            group_id: id,
            source
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

/**
 * Returns a JSON dictionary holding file info.
 */
function info(uuid, { publicKey, baseURL = defaultSettings.baseURL, signal, source, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes }) {
    return retryIfThrottled(() => request({
        method: 'GET',
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        url: getUrl(baseURL, '/info/', {
            jsonerrors: 1,
            pub_key: publicKey,
            file_id: uuid,
            source
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

/**
 * Start multipart uploading.
 */
function multipartStart(size, { publicKey, contentType, fileName, multipartChunkSize = defaultSettings.multipartChunkSize, baseURL = '', secureSignature, secureExpire, store, signal, source = 'local', integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes, metadata }) {
    return retryIfThrottled(() => request({
        method: 'POST',
        url: getUrl(baseURL, '/multipart/start/', { jsonerrors: 1 }),
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        data: buildFormData({
            filename: fileName !== null && fileName !== void 0 ? fileName : defaultFilename,
            size: size,
            content_type: contentType !== null && contentType !== void 0 ? contentType : defaultContentType,
            part_size: multipartChunkSize,
            UPLOADCARE_STORE: getStoreValue(store),
            UPLOADCARE_PUB_KEY: publicKey,
            signature: secureSignature,
            expire: secureExpire,
            source: source,
            metadata
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            // convert to array
            response.parts = Object.keys(response.parts).map((key) => response.parts[key]);
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

/**
 * Complete multipart uploading.
 */
function multipartUpload(part, url, { signal, onProgress }) {
    return request({
        method: 'PUT',
        url,
        data: part,
        // Upload request can't be non-computable because we always know exact size
        onProgress: onProgress,
        signal
    })
        .then((result) => {
        // hack for node ¯\_(ツ)_/¯
        if (onProgress)
            onProgress({
                isComputable: true,
                value: 1
            });
        return result;
    })
        .then(({ status }) => ({ code: status }));
}

/**
 * Complete multipart uploading.
 */
function multipartComplete(uuid, { publicKey, baseURL = defaultSettings.baseURL, source = 'local', signal, integration, userAgent, retryThrottledRequestMaxTimes = defaultSettings.retryThrottledRequestMaxTimes }) {
    return retryIfThrottled(() => request({
        method: 'POST',
        url: getUrl(baseURL, '/multipart/complete/', { jsonerrors: 1 }),
        headers: {
            'X-UC-User-Agent': getUserAgent({ publicKey, integration, userAgent })
        },
        data: buildFormData({
            uuid: uuid,
            UPLOADCARE_PUB_KEY: publicKey,
            source: source
        }),
        signal
    }).then(({ data, headers, request }) => {
        const response = camelizeKeys(JSON.parse(data));
        if ('error' in response) {
            throw new UploadClientError(response.error.content, response.error.errorCode, request, response, headers);
        }
        else {
            return response;
        }
    }), retryThrottledRequestMaxTimes);
}

class UploadcareFile {
    constructor(fileInfo, { baseCDN, defaultEffects, fileName }) {
        this.name = null;
        this.size = null;
        this.isStored = null;
        this.isImage = null;
        this.mimeType = null;
        this.cdnUrl = null;
        this.cdnUrlModifiers = null;
        this.originalUrl = null;
        this.originalFilename = null;
        this.imageInfo = null;
        this.videoInfo = null;
        this.contentInfo = null;
        this.metadata = null;
        const { uuid, s3Bucket } = fileInfo;
        const urlBase = s3Bucket
            ? `https://${s3Bucket}.s3.amazonaws.com/${uuid}/${fileInfo.filename}`
            : `${baseCDN}/${uuid}/`;
        const cdnUrlModifiers = defaultEffects ? `-/${defaultEffects}` : null;
        const cdnUrl = `${urlBase}${cdnUrlModifiers || ''}`;
        const originalUrl = uuid ? urlBase : null;
        this.uuid = uuid;
        this.name = fileName || fileInfo.filename;
        this.size = fileInfo.size;
        this.isStored = fileInfo.isStored;
        this.isImage = fileInfo.isImage;
        this.mimeType = fileInfo.mimeType;
        this.cdnUrl = cdnUrl;
        this.cdnUrlModifiers = cdnUrlModifiers;
        this.originalUrl = originalUrl;
        this.originalFilename = fileInfo.originalFilename;
        this.imageInfo = camelizeKeys(fileInfo.imageInfo);
        this.videoInfo = camelizeKeys(fileInfo.videoInfo);
        this.contentInfo = camelizeKeys(fileInfo.contentInfo);
        this.metadata = fileInfo.metadata || null;
    }
}

const DEFAULT_INTERVAL = 500;
const poll = ({ check, interval = DEFAULT_INTERVAL, signal }) => new Promise((resolve, reject) => {
    let timeoutId;
    onCancel(signal, () => {
        timeoutId && clearTimeout(timeoutId);
        reject(cancelError('Poll cancelled'));
    });
    const tick = () => {
        try {
            Promise.resolve(check(signal))
                .then((result) => {
                if (result) {
                    resolve(result);
                }
                else {
                    timeoutId = setTimeout(tick, interval);
                }
            })
                .catch((error) => reject(error));
        }
        catch (error) {
            reject(error);
        }
    };
    timeoutId = setTimeout(tick, 0);
});

function isReadyPoll({ file, publicKey, baseURL, source, integration, userAgent, retryThrottledRequestMaxTimes, signal, onProgress }) {
    return poll({
        check: (signal) => info(file, {
            publicKey,
            baseURL,
            signal,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes
        }).then((response) => {
            if (response.isReady) {
                return response;
            }
            onProgress && onProgress({ isComputable: true, value: 1 });
            return false;
        }),
        signal
    });
}

const uploadFromObject = (file, { publicKey, fileName, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, baseCDN, metadata }) => {
    return base(file, {
        publicKey,
        fileName,
        baseURL,
        secureSignature,
        secureExpire,
        store,
        signal,
        onProgress,
        source,
        integration,
        userAgent,
        retryThrottledRequestMaxTimes,
        metadata
    })
        .then(({ file }) => {
        return isReadyPoll({
            file,
            publicKey,
            baseURL,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes,
            onProgress,
            signal
        });
    })
        .then((fileInfo) => new UploadcareFile(fileInfo, { baseCDN }));
};

/*globals self, window */

/*eslint-disable @mysticatea/prettier */
const { AbortController, AbortSignal } =
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    /* otherwise */ undefined;

const race = (fns, { signal } = {}) => {
    let lastError = null;
    let winnerIndex = null;
    const controllers = fns.map(() => new AbortController());
    const createStopRaceCallback = (i) => () => {
        winnerIndex = i;
        controllers.forEach((controller, index) => index !== i && controller.abort());
    };
    onCancel(signal, () => {
        controllers.forEach((controller) => controller.abort());
    });
    return Promise.all(fns.map((fn, i) => {
        const stopRace = createStopRaceCallback(i);
        return Promise.resolve()
            .then(() => fn({ stopRace, signal: controllers[i].signal }))
            .then((result) => {
            stopRace();
            return result;
        })
            .catch((error) => {
            lastError = error;
            return null;
        });
    })).then((results) => {
        if (winnerIndex === null) {
            throw lastError;
        }
        else {
            return results[winnerIndex];
        }
    });
};

var WebSocket = window.WebSocket;

class Events {
    constructor() {
        this.events = Object.create({});
    }
    emit(event, data) {
        var _a;
        (_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.forEach((fn) => fn(data));
    }
    on(event, callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }
    off(event, callback) {
        if (callback) {
            this.events[event] = this.events[event].filter((fn) => fn !== callback);
        }
        else {
            this.events[event] = [];
        }
    }
}

const response = (type, data) => {
    if (type === 'success') {
        return Object.assign({ status: Status.Success }, data);
    }
    if (type === 'progress') {
        return Object.assign({ status: Status.Progress }, data);
    }
    return Object.assign({ status: Status.Error }, data);
};
class Pusher {
    constructor(pusherKey, disconnectTime = 30000) {
        this.ws = undefined;
        this.queue = [];
        this.isConnected = false;
        this.subscribers = 0;
        this.emmitter = new Events();
        this.disconnectTimeoutId = null;
        this.key = pusherKey;
        this.disconnectTime = disconnectTime;
    }
    connect() {
        this.disconnectTimeoutId && clearTimeout(this.disconnectTimeoutId);
        if (!this.isConnected && !this.ws) {
            const pusherUrl = `wss://ws.pusherapp.com/app/${this.key}?protocol=5&client=js&version=1.12.2`;
            this.ws = new WebSocket(pusherUrl);
            this.ws.addEventListener('error', (error) => {
                this.emmitter.emit('error', new Error(error.message));
            });
            this.emmitter.on('connected', () => {
                this.isConnected = true;
                this.queue.forEach((message) => this.send(message.event, message.data));
                this.queue = [];
            });
            this.ws.addEventListener('message', (e) => {
                const data = JSON.parse(e.data.toString());
                switch (data.event) {
                    case 'pusher:connection_established': {
                        this.emmitter.emit('connected', undefined);
                        break;
                    }
                    case 'pusher:ping': {
                        this.send('pusher:pong', {});
                        break;
                    }
                    case 'progress':
                    case 'success':
                    case 'fail': {
                        this.emmitter.emit(data.channel, response(data.event, JSON.parse(data.data)));
                    }
                }
            });
        }
    }
    disconnect() {
        const actualDisconect = () => {
            var _a;
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
            this.ws = undefined;
            this.isConnected = false;
        };
        if (this.disconnectTime) {
            this.disconnectTimeoutId = setTimeout(() => {
                actualDisconect();
            }, this.disconnectTime);
        }
        else {
            actualDisconect();
        }
    }
    send(event, data) {
        var _a;
        const str = JSON.stringify({ event, data });
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(str);
    }
    subscribe(token, handler) {
        this.subscribers += 1;
        this.connect();
        const channel = `task-status-${token}`;
        const message = {
            event: 'pusher:subscribe',
            data: { channel }
        };
        this.emmitter.on(channel, handler);
        if (this.isConnected) {
            this.send(message.event, message.data);
        }
        else {
            this.queue.push(message);
        }
    }
    unsubscribe(token) {
        this.subscribers -= 1;
        const channel = `task-status-${token}`;
        const message = {
            event: 'pusher:unsubscribe',
            data: { channel }
        };
        this.emmitter.off(channel);
        if (this.isConnected) {
            this.send(message.event, message.data);
        }
        else {
            this.queue = this.queue.filter((msg) => msg.data.channel !== channel);
        }
        if (this.subscribers === 0) {
            this.disconnect();
        }
    }
    onError(callback) {
        this.emmitter.on('error', callback);
        return () => this.emmitter.off('error', callback);
    }
}
let pusher = null;
const getPusher = (key) => {
    if (!pusher) {
        // no timeout for nodeJS and 30000 ms for browser
        const disconectTimeout = typeof window === 'undefined' ? 0 : 30000;
        pusher = new Pusher(key, disconectTimeout);
    }
    return pusher;
};
const preconnect = (key) => {
    getPusher(key).connect();
};

function pollStrategy({ token, publicKey, baseURL, integration, userAgent, retryThrottledRequestMaxTimes, onProgress, signal }) {
    return poll({
        check: (signal) => fromUrlStatus(token, {
            publicKey,
            baseURL,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes,
            signal
        }).then((response) => {
            switch (response.status) {
                case Status.Error: {
                    return new UploadClientError(response.error, response.errorCode);
                }
                case Status.Waiting: {
                    return false;
                }
                case Status.Unknown: {
                    return new UploadClientError(`Token "${token}" was not found.`);
                }
                case Status.Progress: {
                    if (onProgress) {
                        if (response.total === 'unknown') {
                            onProgress({ isComputable: false });
                        }
                        else {
                            onProgress({
                                isComputable: true,
                                value: response.done / response.total
                            });
                        }
                    }
                    return false;
                }
                case Status.Success: {
                    if (onProgress)
                        onProgress({
                            isComputable: true,
                            value: response.done / response.total
                        });
                    return response;
                }
                default: {
                    throw new Error('Unknown status');
                }
            }
        }),
        signal
    });
}
const pushStrategy = ({ token, pusherKey, signal, onProgress }) => new Promise((resolve, reject) => {
    const pusher = getPusher(pusherKey);
    const unsubErrorHandler = pusher.onError(reject);
    const destroy = () => {
        unsubErrorHandler();
        pusher.unsubscribe(token);
    };
    onCancel(signal, () => {
        destroy();
        reject(cancelError('pusher cancelled'));
    });
    pusher.subscribe(token, (result) => {
        switch (result.status) {
            case Status.Progress: {
                if (onProgress) {
                    if (result.total === 'unknown') {
                        onProgress({ isComputable: false });
                    }
                    else {
                        onProgress({
                            isComputable: true,
                            value: result.done / result.total
                        });
                    }
                }
                break;
            }
            case Status.Success: {
                destroy();
                if (onProgress)
                    onProgress({
                        isComputable: true,
                        value: result.done / result.total
                    });
                resolve(result);
                break;
            }
            case Status.Error: {
                destroy();
                reject(new UploadClientError(result.msg, result.error_code));
            }
        }
    });
});
const uploadFromUrl = (sourceUrl, { publicKey, fileName, baseURL, baseCDN, checkForUrlDuplicates, saveUrlForRecurrentUploads, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, pusherKey = defaultSettings.pusherKey, metadata }) => Promise.resolve(preconnect(pusherKey))
    .then(() => fromUrl(sourceUrl, {
    publicKey,
    fileName,
    baseURL,
    checkForUrlDuplicates,
    saveUrlForRecurrentUploads,
    secureSignature,
    secureExpire,
    store,
    signal,
    source,
    integration,
    userAgent,
    retryThrottledRequestMaxTimes,
    metadata
}))
    .catch((error) => {
    const pusher = getPusher(pusherKey);
    pusher === null || pusher === void 0 ? void 0 : pusher.disconnect();
    return Promise.reject(error);
})
    .then((urlResponse) => {
    if (urlResponse.type === TypeEnum.FileInfo) {
        return urlResponse;
    }
    else {
        return race([
            ({ signal }) => pollStrategy({
                token: urlResponse.token,
                publicKey,
                baseURL,
                integration,
                userAgent,
                retryThrottledRequestMaxTimes,
                onProgress,
                signal
            }),
            ({ signal }) => pushStrategy({
                token: urlResponse.token,
                pusherKey,
                signal,
                onProgress
            })
        ], { signal });
    }
})
    .then((result) => {
    if (result instanceof UploadClientError)
        throw result;
    return result;
})
    .then((result) => isReadyPoll({
    file: result.uuid,
    publicKey,
    baseURL,
    integration,
    userAgent,
    retryThrottledRequestMaxTimes,
    onProgress,
    signal
}))
    .then((fileInfo) => new UploadcareFile(fileInfo, { baseCDN }));

const uploadFromUploaded = (uuid, { publicKey, fileName, baseURL, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, baseCDN }) => {
    return info(uuid, {
        publicKey,
        baseURL,
        signal,
        source,
        integration,
        userAgent,
        retryThrottledRequestMaxTimes
    })
        .then((fileInfo) => new UploadcareFile(fileInfo, { baseCDN, fileName }))
        .then((result) => {
        // hack for node ¯\_(ツ)_/¯
        if (onProgress)
            onProgress({
                isComputable: true,
                value: 1
            });
        return result;
    });
};

/**
 * Get file size.
 */
const getFileSize = (file) => {
    return file.length || file.size;
};
/**
 * Check if FileData is multipart data.
 */
const isMultipart = (fileSize, multipartMinFileSize = defaultSettings.multipartMinFileSize) => {
    return fileSize >= multipartMinFileSize;
};

const sliceChunk = (file, index, fileSize, chunkSize) => {
    const start = chunkSize * index;
    const end = Math.min(start + chunkSize, fileSize);
    return file.slice(start, end);
};

function prepareChunks(file, fileSize, chunkSize) {
    return (index) => sliceChunk(file, index, fileSize, chunkSize);
}

const runWithConcurrency = (concurrency, tasks) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let rejected = false;
        let settled = tasks.length;
        const forRun = [...tasks];
        const run = () => {
            const index = tasks.length - forRun.length;
            const next = forRun.shift();
            if (next) {
                next()
                    .then((result) => {
                    if (rejected)
                        return;
                    results[index] = result;
                    settled -= 1;
                    if (settled) {
                        run();
                    }
                    else {
                        resolve(results);
                    }
                })
                    .catch((error) => {
                    rejected = true;
                    reject(error);
                });
            }
        };
        for (let i = 0; i < concurrency; i++) {
            run();
        }
    });
};

const uploadPartWithRetry = (chunk, url, { publicKey, onProgress, signal, integration, multipartMaxAttempts }) => retrier(({ attempt, retry }) => multipartUpload(chunk, url, {
    publicKey,
    onProgress,
    signal,
    integration
}).catch((error) => {
    if (attempt < multipartMaxAttempts) {
        return retry();
    }
    throw error;
}));
const uploadMultipart = (file, { publicKey, fileName, fileSize, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartChunkSize = defaultSettings.multipartChunkSize, maxConcurrentRequests = defaultSettings.maxConcurrentRequests, multipartMaxAttempts = defaultSettings.multipartMaxAttempts, baseCDN, metadata }) => {
    const size = fileSize || getFileSize(file);
    let progressValues;
    const createProgressHandler = (totalChunks, chunkIdx) => {
        if (!onProgress)
            return;
        if (!progressValues) {
            progressValues = Array(totalChunks).fill(0);
        }
        const sum = (values) => values.reduce((sum, next) => sum + next, 0);
        return (info) => {
            if (!info.isComputable) {
                return;
            }
            progressValues[chunkIdx] = info.value;
            onProgress({
                isComputable: true,
                value: sum(progressValues) / totalChunks
            });
        };
    };
    return multipartStart(size, {
        publicKey,
        contentType,
        fileName: fileName !== null && fileName !== void 0 ? fileName : file.name,
        baseURL,
        secureSignature,
        secureExpire,
        store,
        signal,
        source,
        integration,
        userAgent,
        retryThrottledRequestMaxTimes,
        metadata
    })
        .then(({ uuid, parts }) => {
        const getChunk = prepareChunks(file, size, multipartChunkSize);
        return Promise.all([
            uuid,
            runWithConcurrency(maxConcurrentRequests, parts.map((url, index) => () => uploadPartWithRetry(getChunk(index), url, {
                publicKey,
                onProgress: createProgressHandler(parts.length, index),
                signal,
                integration,
                multipartMaxAttempts
            })))
        ]);
    })
        .then(([uuid]) => multipartComplete(uuid, {
        publicKey,
        baseURL,
        source,
        integration,
        userAgent,
        retryThrottledRequestMaxTimes
    }))
        .then((fileInfo) => {
        if (fileInfo.isReady) {
            return fileInfo;
        }
        else {
            return isReadyPoll({
                file: fileInfo.uuid,
                publicKey,
                baseURL,
                source,
                integration,
                userAgent,
                retryThrottledRequestMaxTimes,
                onProgress,
                signal
            });
        }
    })
        .then((fileInfo) => new UploadcareFile(fileInfo, { baseCDN }));
};

/**
 * Uploads file from provided data.
 */
function uploadFile(data, { publicKey, fileName, baseURL = defaultSettings.baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartMinFileSize, multipartChunkSize, multipartMaxAttempts, maxConcurrentRequests, baseCDN = defaultSettings.baseCDN, checkForUrlDuplicates, saveUrlForRecurrentUploads, pusherKey, metadata }) {
    if (isFileData(data)) {
        const fileSize = getFileSize(data);
        if (isMultipart(fileSize, multipartMinFileSize)) {
            return uploadMultipart(data, {
                publicKey,
                contentType,
                multipartChunkSize,
                multipartMaxAttempts,
                fileName,
                baseURL,
                secureSignature,
                secureExpire,
                store,
                signal,
                onProgress,
                source,
                integration,
                userAgent,
                maxConcurrentRequests,
                retryThrottledRequestMaxTimes,
                baseCDN,
                metadata
            });
        }
        return uploadFromObject(data, {
            publicKey,
            fileName,
            baseURL,
            secureSignature,
            secureExpire,
            store,
            signal,
            onProgress,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes,
            baseCDN,
            metadata
        });
    }
    if (isUrl(data)) {
        return uploadFromUrl(data, {
            publicKey,
            fileName,
            baseURL,
            baseCDN,
            checkForUrlDuplicates,
            saveUrlForRecurrentUploads,
            secureSignature,
            secureExpire,
            store,
            signal,
            onProgress,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes,
            pusherKey,
            metadata
        });
    }
    if (isUuid(data)) {
        return uploadFromUploaded(data, {
            publicKey,
            fileName,
            baseURL,
            signal,
            onProgress,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes,
            baseCDN
        });
    }
    throw new TypeError(`File uploading from "${data}" is not supported`);
}

class UploadcareGroup {
    constructor(groupInfo, files) {
        this.storedAt = null;
        this.uuid = groupInfo.id;
        this.filesCount = groupInfo.filesCount;
        this.totalSize = Object.values(groupInfo.files).reduce((acc, file) => acc + file.size, 0);
        this.isStored = !!groupInfo.datetimeStored;
        this.isImage = !!Object.values(groupInfo.files).filter((file) => file.isImage).length;
        this.cdnUrl = groupInfo.cdnUrl;
        this.files = files;
        this.createdAt = groupInfo.datetimeCreated;
        this.storedAt = groupInfo.datetimeStored;
    }
}

/**
 * FileData type guard.
 */
const isFileDataArray = (data) => {
    for (const item of data) {
        if (!isFileData(item)) {
            return false;
        }
    }
    return true;
};
/**
 * Uuid type guard.
 */
const isUuidArray = (data) => {
    for (const item of data) {
        if (!isUuid(item)) {
            return false;
        }
    }
    return true;
};
/**
 * Url type guard.
 */
const isUrlArray = (data) => {
    for (const item of data) {
        if (!isUrl(item)) {
            return false;
        }
    }
    return true;
};

function uploadFileGroup(data, { publicKey, fileName, baseURL = defaultSettings.baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartChunkSize = defaultSettings.multipartChunkSize, baseCDN = defaultSettings.baseCDN, jsonpCallback, defaultEffects }) {
    if (!isFileDataArray(data) && !isUrlArray(data) && !isUuidArray(data)) {
        throw new TypeError(`Group uploading from "${data}" is not supported`);
    }
    let progressValues;
    let isStillComputable = true;
    const filesCount = data.length;
    const createProgressHandler = (size, index) => {
        if (!onProgress)
            return;
        if (!progressValues) {
            progressValues = Array(size).fill(0);
        }
        const normalize = (values) => values.reduce((sum, next) => sum + next) / size;
        return (info) => {
            if (!info.isComputable || !isStillComputable) {
                isStillComputable = false;
                onProgress({ isComputable: false });
                return;
            }
            progressValues[index] = info.value;
            onProgress({ isComputable: true, value: normalize(progressValues) });
        };
    };
    return Promise.all(data.map((file, index) => uploadFile(file, {
        publicKey,
        fileName,
        baseURL,
        secureSignature,
        secureExpire,
        store,
        signal,
        onProgress: createProgressHandler(filesCount, index),
        source,
        integration,
        userAgent,
        retryThrottledRequestMaxTimes,
        contentType,
        multipartChunkSize,
        baseCDN
    }))).then((files) => {
        const uuids = files.map((file) => file.uuid);
        const addDefaultEffects = (file) => {
            const cdnUrlModifiers = defaultEffects ? `-/${defaultEffects}` : null;
            const cdnUrl = `${file.urlBase}${cdnUrlModifiers || ''}`;
            return Object.assign(Object.assign({}, file), { cdnUrlModifiers,
                cdnUrl });
        };
        const filesInGroup = defaultEffects ? files.map(addDefaultEffects) : files;
        return group(uuids, {
            publicKey,
            baseURL,
            jsonpCallback,
            secureSignature,
            secureExpire,
            signal,
            source,
            integration,
            userAgent,
            retryThrottledRequestMaxTimes
        })
            .then((groupInfo) => new UploadcareGroup(groupInfo, filesInGroup))
            .then((group) => {
            onProgress && onProgress({ isComputable: true, value: 1 });
            return group;
        });
    });
}

/**
 * Populate options with settings.
 */
const populateOptionsWithSettings = (options, settings) => (Object.assign(Object.assign({}, settings), options));
class UploadClient {
    constructor(settings) {
        this.settings = Object.assign({}, defaultSettings, settings);
    }
    updateSettings(newSettings) {
        this.settings = Object.assign(this.settings, newSettings);
    }
    getSettings() {
        return this.settings;
    }
    base(file, options) {
        const settings = this.getSettings();
        return base(file, populateOptionsWithSettings(options, settings));
    }
    info(uuid, options) {
        const settings = this.getSettings();
        return info(uuid, populateOptionsWithSettings(options, settings));
    }
    fromUrl(sourceUrl, options) {
        const settings = this.getSettings();
        return fromUrl(sourceUrl, populateOptionsWithSettings(options, settings));
    }
    fromUrlStatus(token, options) {
        const settings = this.getSettings();
        return fromUrlStatus(token, populateOptionsWithSettings(options, settings));
    }
    group(uuids, options) {
        const settings = this.getSettings();
        return group(uuids, populateOptionsWithSettings(options, settings));
    }
    groupInfo(id, options) {
        const settings = this.getSettings();
        return groupInfo(id, populateOptionsWithSettings(options, settings));
    }
    multipartStart(size, options) {
        const settings = this.getSettings();
        return multipartStart(size, populateOptionsWithSettings(options, settings));
    }
    multipartUpload(part, url, options) {
        const settings = this.getSettings();
        return multipartUpload(part, url, populateOptionsWithSettings(options, settings));
    }
    multipartComplete(uuid, options) {
        const settings = this.getSettings();
        return multipartComplete(uuid, populateOptionsWithSettings(options, settings));
    }
    uploadFile(data, options) {
        const settings = this.getSettings();
        return uploadFile(data, populateOptionsWithSettings(options, settings));
    }
    uploadFileGroup(data, options) {
        const settings = this.getSettings();
        return uploadFileGroup(data, populateOptionsWithSettings(options, settings));
    }
}




/***/ }),

/***/ "./resources/js/Vendors/Pages/Software/AddSoftware.js":
/*!************************************************************!*\
  !*** ./resources/js/Vendors/Pages/Software/AddSoftware.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../axios */ "./resources/js/axios.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils */ "./resources/js/utils.js");
/* harmony import */ var _uploadcare_upload_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @uploadcare/upload-client */ "./node_modules/@uploadcare/upload-client/dist/index.browser.js");
/* harmony import */ var _Helpers_HelperFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Helpers/HelperFunction */ "./resources/js/Vendors/Helpers/HelperFunction.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













function AddSoftware() {
  var client = new _uploadcare_upload_client__WEBPACK_IMPORTED_MODULE_7__.UploadClient({
    publicKey: "7236e8ede7c38af26acc"
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      Categories = _useState2[0],
      setCategories = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      SoftwareName = _useState4[0],
      setSoftwareName = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      Tagline = _useState6[0],
      setTagline = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      ProductURL = _useState8[0],
      setProductURL = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      CategoryID = _useState10[0],
      setCategoryID = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState12 = _slicedToArray(_useState11, 2),
      SoftwareCompt = _useState12[0],
      setSoftwareCompt = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState14 = _slicedToArray(_useState13, 2),
      Summary = _useState14[0],
      setSummary = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState16 = _slicedToArray(_useState15, 2),
      Description = _useState16[0],
      setDescription = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState18 = _slicedToArray(_useState17, 2),
      Logo = _useState18[0],
      setLogo = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
      _useState20 = _slicedToArray(_useState19, 2),
      SoftwareId = _useState20[0],
      setSoftwareId = _useState20[1];

  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1),
      _useState22 = _slicedToArray(_useState21, 2),
      FormSlider = _useState22[0],
      setFormSlider = _useState22[1];

  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState24 = _slicedToArray(_useState23, 2),
      OfferTrial = _useState24[0],
      setOfferTrial = _useState24[1];

  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState26 = _slicedToArray(_useState25, 2),
      isLifeTimeFree = _useState26[0],
      setisLifeTimeFree = _useState26[1];

  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState28 = _slicedToArray(_useState27, 2),
      isCustomizable = _useState28[0],
      setisCustomizable = _useState28[1];

  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState30 = _slicedToArray(_useState29, 2),
      DesktopPlatform = _useState30[0],
      setDesktopPlatform = _useState30[1];

  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState32 = _slicedToArray(_useState31, 2),
      AviablePlatform = _useState32[0],
      setAviablePlatform = _useState32[1];

  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState34 = _slicedToArray(_useState33, 2),
      Romb = _useState34[0],
      setRomb = _useState34[1];

  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState36 = _slicedToArray(_useState35, 2),
      PaymentOption = _useState36[0],
      setPaymentOption = _useState36[1];

  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState38 = _slicedToArray(_useState37, 2),
      IsAPIavailable = _useState38[0],
      setIsAPIavailable = _useState38[1];

  var _useState39 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState40 = _slicedToArray(_useState39, 2),
      TargetAudience = _useState40[0],
      setTargetAudience = _useState40[1];

  var _useState41 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState42 = _slicedToArray(_useState41, 2),
      MPO = _useState42[0],
      setMPO = _useState42[1];

  var _useState43 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState44 = _slicedToArray(_useState43, 2),
      LA = _useState44[0],
      setLA = _useState44[1];

  var _useState45 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState46 = _slicedToArray(_useState45, 2),
      integration = _useState46[0],
      setintegration = _useState46[1];

  var _useState47 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState48 = _slicedToArray(_useState47, 2),
      AvailableSupport = _useState48[0],
      setAvailableSupport = _useState48[1];

  var _useState49 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState50 = _slicedToArray(_useState49, 2),
      SS = _useState50[0],
      setSS = _useState50[1];

  var _useState51 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState52 = _slicedToArray(_useState51, 2),
      VideoLink = _useState52[0],
      setVideoLink = _useState52[1];

  var _useState53 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState54 = _slicedToArray(_useState53, 2),
      BrochureLink = _useState54[0],
      setBrochureLink = _useState54[1];

  var _useState55 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState56 = _slicedToArray(_useState55, 2),
      Ebooks = _useState56[0],
      setEbooks = _useState56[1];

  var _useState57 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState58 = _slicedToArray(_useState57, 2),
      Whitepapers = _useState58[0],
      setWhitepapers = _useState58[1];

  var _useState59 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState60 = _slicedToArray(_useState59, 2),
      PDF = _useState60[0],
      setPDF = _useState60[1];

  var _useState61 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState62 = _slicedToArray(_useState61, 2),
      Guide = _useState62[0],
      setGuide = _useState62[1];

  var _useState63 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
      _useState64 = _slicedToArray(_useState63, 2),
      AppFile = _useState64[0],
      setAppFile = _useState64[1];

  var history = (0,react_router__WEBPACK_IMPORTED_MODULE_8__.useHistory)(); // const []

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/software-categories").then(function (res) {
      setCategories(res.data);
    }); // setFormSlider()
  }, []);

  var _useState65 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState66 = _slicedToArray(_useState65, 2),
      CompanyDetails = _useState66[0],
      setCompanyDetails = _useState66[1];

  var _useState67 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true),
      _useState68 = _slicedToArray(_useState67, 2),
      loading = _useState68[0],
      setloading = _useState68[1];

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    (0,_Helpers_HelperFunction__WEBPACK_IMPORTED_MODULE_5__.getCompanydetails)().then(function (response) {
      console.log(response);
      setCompanyDetails(response);

      if (response) {
        setloading(false);
      }
    });
  }, []);

  if (!CompanyDetails) {
    history.push('/vendor/add-company');
  }

  var HandleFirstSubmit = function HandleFirstSubmit(e) {
    e.preventDefault();
    var vendorid = (0,_Helpers_HelperFunction__WEBPACK_IMPORTED_MODULE_5__.get_current_auth_id)();
    var data = {
      vendor_id: vendorid,
      software_name: SoftwareName,
      tagline: Tagline,
      category_id: CategoryID,
      software_competitors: SoftwareCompt,
      summary: Summary,
      description: Description
    };
    var fileData = new FormData();
    fileData.append('file', Logo);
    _axios__WEBPACK_IMPORTED_MODULE_3__.venodrAxios.post("/software/create", data).then(function (res) {
      console.log(res.data);
      fileData.append('id', res.data.data.id);
      setSoftwareId(res.data.data.id);
      _axios__WEBPACK_IMPORTED_MODULE_3__.venodrAxios.post('/software/handle-logo', fileData).then(function (res) {
        if (res.status == 200) {
          react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success('🦄' + res.data.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
          setFormSlider(2);
        }
      })["catch"](function (error) {
        if (error.response && error.response.status == 422) {
          var errors = error.response.data.errors;

          for (var key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
              var element = errors[key][0];
              console.log(element);
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error('🦄' + element, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
            }
          }
        }
      });
    });
  };

  var HandleSecondSubmit = function HandleSecondSubmit(e) {
    e.preventDefault();
    var data = {
      software_id: SoftwareId,
      offer_trial: OfferTrial,
      is_lifetime_free: isLifeTimeFree,
      is_customizable: isCustomizable,
      desktop_platform: DesktopPlatform,
      available_support: AvailableSupport,
      runs_on_mobile_browser: Romb,
      payment_options: PaymentOption,
      is_api_available: IsAPIavailable,
      target_audience: TargetAudience,
      mobile_platform_options: MPO,
      language_available: LA,
      integration: integration
    };
    console.log(data);
    var rules = {
      software_id: "required",
      offer_trial: "required",
      is_lifetime_free: "required",
      is_customizable: "required",
      desktop_platform: "required",
      available_support: "required",
      runs_on_mobile_browser: "required",
      payment_options: "required",
      is_api_available: "required",
      target_audience: "required",
      mobile_platform_options: "required",
      language_available: "required",
      integration: "required"
    };

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_4__.validator)(data, rules)) {
      _axios__WEBPACK_IMPORTED_MODULE_3__.venodrAxios.post('/software_specification/store', data).then(function (res) {
        if (res.status == 201) {
          react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success('🦄' + res.data.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
          setFormSlider(3);
        }
      })["catch"](function (error) {
        if (error.response && error.response.status == 422) {
          var errors = error.response.data.errors;

          for (var key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
              var element = errors[key][0];
              console.log(element);
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error('🦄' + element, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
            }
          }
        }
      });
    }
  };

  var HandleThirdSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(e) {
      var thirdFormData;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              setloading(true);
              thirdFormData = new FormData();
              thirdFormData.append('screenshots', SS);
              thirdFormData.append('brochure', BrochureLink);
              thirdFormData.append('ebooks', Ebooks);
              thirdFormData.append('video_link', VideoLink);
              thirdFormData.append('whitepapers', Whitepapers);
              thirdFormData.append('pdf', PDF);
              thirdFormData.append('guides', Guide);
              thirdFormData.append('software_id', SoftwareId);
              _context.next = 13;
              return client.uploadFile(AppFile).then(function (res) {
                console.log(res.uuid);
                thirdFormData.append('app', 'https://ucarecdn.com/' + res.uuid);
                _axios__WEBPACK_IMPORTED_MODULE_3__.venodrAxios.post('/softwaremedia/create', thirdFormData).then(function (res) {
                  if (res) {
                    setloading(false);
                    react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success('🦄' + "Saved", {
                      position: "top-left",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true
                    });
                    window.location.href = "/vendor";
                  }
                });
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function HandleThirdSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_toastify__WEBPACK_IMPORTED_MODULE_9__.ToastContainer, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "col-12 grid-margin",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "card",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "card-body",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
            className: "card-title",
            children: "Add Software"
          }), FormSlider == 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("form", {
            className: "form-sample",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              className: "badge",
              children: "1. Basic Details"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Software Name"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "text",
                      onChange: function onChange(e) {
                        return setSoftwareName(e.target.value);
                      },
                      value: SoftwareName
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Product URL"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "url",
                      onChange: function onChange(e) {
                        return setProductURL(e.target.value);
                      },
                      value: ProductURL
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Tagline"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "text",
                      onChange: function onChange(e) {
                        return setTagline(e.target.value);
                      },
                      value: Tagline
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Product Logo"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "col-sm-9",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control d-none visibility-hidden",
                      id: "customFileLang",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setLogo(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "customFileLang",
                      children: "Upload image"
                    })]
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Category"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("select", {
                      className: "form-control",
                      onChange: function onChange(e) {
                        return setCategoryID(e.target.value);
                      },
                      children: Categories.map(function (c, i) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
                          value: c.id,
                          children: c.name
                        }, i);
                      })
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-3 col-form-label",
                    children: "Software Competitors"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "text",
                      onChange: function onChange(e) {
                        return setSoftwareCompt(e.target.value);
                      },
                      value: SoftwareCompt
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-2 col-form-label",
                    children: "Summary *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9 offset-1",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
                      className: "form-control",
                      rows: "5",
                      columns: "2",
                      onChange: function onChange(e) {
                        return setSummary(e.target.value);
                      },
                      value: Summary
                    })
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                className: "col-md-12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-2 col-form-label",
                    children: "Description *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9 offset-1",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
                      className: "form-control",
                      rows: "5",
                      columns: "2",
                      onChange: function onChange(e) {
                        return setDescription(e.target.value);
                      },
                      value: Description
                    })
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
              type: "submit",
              className: "btn btn-primary mr-2",
              onClick: function onClick(e) {
                return HandleFirstSubmit(e);
              },
              children: "Save & Next"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
              type: "reset",
              className: "btn btn-light",
              children: "Reset"
            })]
          }) : null, FormSlider == 2 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("form", {
            className: "form-sample",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              className: "badge",
              children: "2. Specifications"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "How is Software accessible? *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex justify-content-around flex-wrap",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "access",
                            value: "Cloud Based"
                          }), " Cloud Based", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "access",
                            value: "On Premises"
                          }), " On Premises", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "access",
                            value: "Hybrid"
                          }), " Hybrid", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-Primary",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "access",
                            value: "Any"
                          }), " Any", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Does this Software Offers Free Trial?"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        onChange: function onChange(e) {
                          return setOfferTrial(e.target.value);
                        },
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "freet",
                            value: "1"
                          }), " Yes", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "freet",
                            value: "0"
                          }), " No", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Is Customization possible?"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex  flex-wrap",
                      onChange: function onChange(e) {
                        return setisCustomizable(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "customization",
                            value: "1"
                          }), " Yes", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "customization",
                            value: "0"
                          }), " No", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Does the software run on mobile browser? *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      onChange: function onChange(e) {
                        return setRomb(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "mobile_supp_b",
                            value: "1"
                          }), " Yes", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "mobile_supp_b",
                            value: "0"
                          }), " No", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Does this software has a lifetime free plan? *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex  flex-wrap",
                      onChange: function onChange(e) {
                        return setisLifeTimeFree(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "lifetime",
                            value: "1"
                          }), " Yes", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "lifetime",
                            value: "0"
                          }), " No", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Are APIs available for this software? *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      onChange: function onChange(e) {
                        return setIsAPIavailable(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "is_Api",
                            value: "1"
                          }), " Yes", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "is_Api",
                            value: "0"
                          }), " No", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Payment Options *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex  flex-wrap",
                      onChange: function onChange(e) {
                        return setPaymentOption([].concat(_toConsumableArray(PaymentOption), [e.target.value]));
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "yearly"
                          }), " Yearly", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "monthly"
                          }), " Monthly", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "onetime"
                          }), " Onetime (Perpetual license)", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "transaction"
                          }), " Transaction", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Target Audience"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      onChange: function onChange(e) {
                        return setTargetAudience([].concat(_toConsumableArray(TargetAudience), [e.target.value]));
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "Freelancers"
                          }), " Freelancers", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "Startups"
                          }), " Startups", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "SMEs"
                          }), " SMEs", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "Agencies"
                          }), " Agencies", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "po",
                            value: "Enterprises"
                          }), " Enterprises", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Desktop Platforms Options *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex  flex-wrap",
                      onChange: function onChange(e) {
                        return setDesktopPlatform([].concat(_toConsumableArray(DesktopPlatform), [e.target.value]));
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Web App"
                          }), " Web App", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Windows"
                          }), " Windows", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Machintosh"
                          }), " Machintosh", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Mobile Platforms Options"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      onChange: function onChange(e) {
                        return setMPO(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "mplatforms",
                            value: "IOS/App Store"
                          }), " IOS/App Store", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "mplatforms",
                            value: "Android/Play Store"
                          }), " Androis/Play Store", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Aviable Support*"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-10",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex  flex-wrap",
                      onChange: function onChange(e) {
                        return setAvailableSupport([].concat(_toConsumableArray(AvailableSupport), [e.target.value]));
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Email"
                          }), " Email", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Phone"
                          }), " Phone", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Live Support"
                          }), " Live Support", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Training"
                          }), " Training", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "checkbox",
                            className: "form-check-input",
                            name: "platforms",
                            value: "Tickets"
                          }), " Tickets", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-12 col-form-label",
                    children: "Available languages *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                      className: "d-flex flex-wrap",
                      onChange: function onChange(e) {
                        return setLA(e.target.value);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "lang",
                            value: "ENG Only"
                          }), " ENG only", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                        className: "form-check form-check-primary mr-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                          className: "form-check-label",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                            type: "radio",
                            className: "form-check-input",
                            name: "lang",
                            value: "ENG and few others"
                          }), " ENG and few others", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                            className: "input-helper"
                          })]
                        })
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    className: "col-sm-2 text-center col-form-label",
                    children: "Integrations"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "col-sm-9",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
                      className: "form-control",
                      rows: "5",
                      columns: "2",
                      onChange: function onChange(e) {
                        return setintegration(e.target.value);
                      }
                    })
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "my-lg-4 p-1",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                type: "submit",
                className: "btn btn-primary mr-2",
                onClick: function onClick(e) {
                  return HandleSecondSubmit(e);
                },
                children: "Save & Next"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                type: "reset",
                className: "btn btn-light",
                children: "Reset"
              })]
            })]
          }) : null, FormSlider == 3 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("form", {
            className: "form-sample",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              className: "badge",
              children: "3. Software Media"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Screenshots *"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "ss",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setSS(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "ss",
                      children: "Upload image"
                    })]
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Video Link "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
                    className: "form-control"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Brochure File "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "brochureFile",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setBrochureLink(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "brochureFile",
                      children: "Upload Brochure"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Ebooks "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "ebookFile",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setEbooks(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "ebookFile",
                      children: "Upload Ebook"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Whitepaper "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "whitepaper",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setWhitepapers(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "whitepaper",
                      children: "Upload Whitepaper"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "PDF "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "PDF",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setPDF(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "PDF",
                      children: "Upload PDF"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Guides "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "custom-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "Guides",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setGuide(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "custom-file-label",
                      htmlFor: "Guides",
                      children: "Upload Guides"
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-8",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Group, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                    children: "Application File "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "app-file",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.default.Control, {
                      type: "file",
                      className: "form-control visibility-hidden",
                      id: "AppFile",
                      lang: "en",
                      onChange: function onChange(e) {
                        return setAppFile(e.target.files[0]);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
                      className: "app-file-label",
                      htmlFor: "AppFile",
                      children: "Upload Application File"
                    })]
                  })]
                })
              }), loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                children: "uploading to CDN..."
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "my-lg-4 p-1",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                type: "submit",
                className: "btn btn-primary mr-2",
                onClick: function onClick(e) {
                  return HandleThirdSubmit(e);
                },
                children: "Save & Next"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                type: "reset",
                className: "btn btn-light",
                children: "Reset"
              })]
            })]
          }) : null, FormSlider == 4 ? fourth : null]
        })
      })
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddSoftware);

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ })

}]);