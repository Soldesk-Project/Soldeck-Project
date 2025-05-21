package org.joonzis.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.MemberVO;

public interface MemberMapper {

	void insertMember(MemberVO member);

    Integer selectMemNoById(@Param("mem_id") String mem_id);

    void insertFoodKate(@Param("mem_no") Integer mem_no, @Param("food_no") Integer food);

    
    List<String> findIdByNameBirthContact(
            @Param("mem_name") String mem_name,
            @Param("mem_birth") String mem_birth,
            @Param("mem_phone") Long mem_phone
    );

	String findPwByIdBirthContact(
			@Param("mem_id") String mem_id,
			@Param("mem_birth") String mem_birth,
			@Param("mem_phone") Long mem_phone
		);
	
	int countById(String mem_id);
	
	public MemberVO getMemberInfo(@Param("mem_no") int mem_no);
	public int[] getFoodKateInfo(@Param("mem_no") int mem_no);
	public boolean modify(MemberVO vo);
	public int deleteFoodKate(@Param("mem_no") int mem_no);
	MemberVO loginProcess(@Param("mem_id") String mem_id);
	
	public List<String> getFriendFoodKate(@Param("friend_mem_no") int friend_mem_no);
	
	public void insertEventInfo(int mem_no);
	public int deleteMemberInfo(int mem_no);
	public int deleteReservesByMemNo(int mem_no);
	public int deleteCommentsByMemNo(int mem_no);
	public int deleteFoodKateByMemNo(int mem_no);
	public int deleteBookmarksByMemNo(int mem_no);
	public int deleteFriendRequestsByMemNo(int mem_no);
	public int deleteFriendsByMemNo(int mem_no);
	public int deleteGroupsByMemNo(int mem_no);
	public int deleteAttendanceCheckByMemNo(int mem_no);
	public int deleteEventInfoByMemNo(int mem_no);
	public int deleteGroupMemByMemNo(int mem_no);
	public int deleteGroupReqByMemNo(int mem_no);
	
}