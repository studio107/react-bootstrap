var cache = {
    _data: {},
    set: function(key, value) {
        this._data[key] = value;
    },
    get: function(key, value) {
        value = value || null;
        if (this._data[key]) {
            return this._data[key];
        }

        return value ? value : null;
    }
};

var api = {
    _process: function(url, data, successFn, errFn, method) {
        url = url || '';
        data = data || {};
        successFn = successFn || function() {};
        errFn = errFn || function(xhr, data, err) {
            console.log("Error:", err.toString());
        };
        method = method || 'GET';

        $.ajax({
            url: url,
            method: method,
            data: data,
            dataType: "json",
            success: successFn,
            error: errFn
        });
    },
    get: function(url, data, successFn, errFn) {
        this._process(url, data, successFn, errFn, 'GET');
    },
    post: function(url, data, successFn, errFn) {
        this._process(url, data, successFn, errFn, 'POST');
    }
};

var formValidate = function($form, errors) {
    errors = errors || {};
    $form.find('input, select, textarea').each(function () {
        var $this = $(this),
            name = $this.attr('name'),
            $errors = $this.next('.errors');

        if ($errors.length) {
            $errors.html('');
            var name = $this.attr('name');
            if (typeof errors[name] != 'undefined') {
                $this.addClass('error');
                $errors.css('display', 'block');
                var inputErrors = errors[name];
                for (var key in inputErrors) {
                    var error = inputErrors[key];
                    $errors.append($('<li/>').text(error));
                }
            } else {
                $this.removeClass('error');
                $errors.css('display', 'none');
            }
        }
    });
};

var chunk = function(arr, chunkSize) {
    return [].concat.apply([],
        arr.map(function(elem,i) {
            return i % chunkSize ? [] : [arr.slice(i, i+chunkSize)];
        })
    );
};

function nl2br(str) {
    return str.replace(/([^>])\n/g, '$1<br/>');
}

function createMd() {
    return new Remarkable({
        breaks: false,
        html: false,
        typographer: false,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {}
            }

            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {}

            return '';
        }
    });
}