package net.emsi.reservservice.dto;

import java.util.Date;

public class ReservRequestDTO {
    private Date reservDate;
    private Long customerId;
    private Long terrainId;

    // Getters and Setters
    public Date getReservDate() {
        return reservDate;
    }

    public void setReservDate(Date reservDate) {
        this.reservDate = reservDate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getTerrainId() {
        return terrainId;
    }

    public void setTerrainId(Long terrainId) {
        this.terrainId = terrainId;
    }
}
