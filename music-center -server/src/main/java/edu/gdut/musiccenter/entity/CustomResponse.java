package edu.gdut.musiccenter.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

/**
 * @description: CustomResponse
 * @date: 2020/11/14 15:14
 * @author: Stephen
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomResponse implements Serializable {

    private int code;
    private Object data;

    public CustomResponse() {
    }

    public CustomResponse(int code, Object data) {
        this.code = code;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
