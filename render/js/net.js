$xhr = {
    length: 0,
};

function net(url, data, callback) {
    var xhr = new XMLHttpRequest();
        $xhr[++$xhr.length] = xhr;
        xhr.xhrID = $xhr.length;
        
        xhr.open("POST",url);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200)
                {
                if (callback)
                    {
                    callback(xhr.responseText);                    
                    }
                }

            if (xhr.readyState === 4)
                {
                // remove from $xhr
                delete $xhr[xhr.xhrID];
                }
        };

        data = data;
        
        if (typeof data !== "string")
            {
            data = JSON.stringify(data);
            }
            
        xhr.send(data);
}