
package com.bookrequest.dto;

import com.bookrequest.entity.BookStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateBookStatusDTO {

    @NotNull(message = "Book status is required")
    private BookStatus status;

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }
}
